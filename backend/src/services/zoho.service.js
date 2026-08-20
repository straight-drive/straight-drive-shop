import axios from 'axios'
import { env } from '../config/env.js'
import { ApiError } from '../utils/ApiError.js'

let cachedAccessToken = null
let tokenExpiresAt = 0

/**
 * Zoho access tokens are short-lived (~1 hour). We refresh using the
 * long-lived refresh token and cache the access token in memory until
 * it's close to expiring.
 */
async function getAccessToken() {
  if (cachedAccessToken && Date.now() < tokenExpiresAt) {
    return cachedAccessToken
  }

  const res = await axios.post(`${env.ZOHO_ACCOUNTS_DOMAIN}/oauth/v2/token`, null, {
    params: {
      refresh_token: env.ZOHO_REFRESH_TOKEN,
      client_id: env.ZOHO_CLIENT_ID,
      client_secret: env.ZOHO_CLIENT_SECRET,
      grant_type: 'refresh_token',
    },
  })

  cachedAccessToken = res.data.access_token
  // refresh 5 minutes early to be safe
  tokenExpiresAt = Date.now() + (res.data.expires_in - 300) * 1000
  return cachedAccessToken
}

async function zohoRequest(method, path, { params = {}, data } = {}) {
  const accessToken = await getAccessToken()
  try {
    const res = await axios({
      method,
      url: `${env.ZOHO_API_DOMAIN}/books/v3${path}`,
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
      },
      params: {
        organization_id: env.ZOHO_ORGANIZATION_ID,
        ...params,
      },
      data,
    })
    return res.data
  } catch (err) {
    const message = err?.response?.data?.message || 'Zoho Books request failed'
    throw new ApiError(502, `Zoho Books error: ${message}`)
  }
}

/**
 * Looks up a Zoho Books contact by email. Returns null if not found.
 */
async function findContactByEmail(email) {
  const data = await zohoRequest('get', '/contacts', { params: { email } })
  return data.contacts?.[0] || null
}

function toZohoAddress(addr) {
  if (!addr) return undefined
  const truncate = (v, max) => (v ? String(v).slice(0, max) : undefined)
  return {
    attention: truncate(addr.fullName, 100),
    address: truncate(addr.line1, 100),
    street2: truncate(addr.line2, 100),
    city: truncate(addr.city, 50),
    state: truncate(addr.state, 50),
    zip: truncate(addr.postalCode, 20),
    country: truncate(addr.country || 'India', 50),
    phone: truncate(addr.phone, 20),
  }
}

async function createContact({ name, email, phone, billingAddress, shippingAddress, gstin, companyName }) {
  const data = await zohoRequest('post', '/contacts', {
    data: {
      contact_name: companyName || name,
      company_name: companyName || undefined,
      gst_no: gstin && gstin.length === 15 ? gstin : undefined,
      gst_treatment: gstin && gstin.length === 15 ? 'business_gst' : 'consumer',
      billing_address: toZohoAddress(billingAddress),
      shipping_address: toZohoAddress(shippingAddress),
      contact_persons: [
        {
          email,
          phone,
          is_primary_contact: true,
        },
      ],
    },
  })
  return data.contact
}

async function updateContact(contactId, { name, billingAddress, shippingAddress, gstin, companyName }) {
  const data = await zohoRequest('put', `/contacts/${contactId}`, {
    data: {
      contact_name: companyName || name,
      company_name: companyName || undefined,
      gst_no: gstin && gstin.length === 15 ? gstin : undefined,
      gst_treatment: gstin && gstin.length === 15 ? 'business_gst' : 'consumer',
      billing_address: toZohoAddress(billingAddress),
      shipping_address: toZohoAddress(shippingAddress),
    },
  })
  return data.contact
}

/**
 * Finds an existing contact by email, or creates one if none exists.
 */
export async function findOrCreateContact({ name, email, phone, billingAddress, shippingAddress, gstin, companyName }) {
  const existing = await findContactByEmail(email)
  if (existing) {
    // Refresh address and GST details — they may have changed since last order.
    try {
      return await updateContact(existing.contact_id, {
        name,
        billingAddress,
        shippingAddress,
        gstin,
        companyName,
      })
    } catch (err) {
      console.error('Could not update Zoho contact, using existing:', err?.message)
      return existing
    }
  }
  return createContact({ name, email, phone, billingAddress, shippingAddress, gstin, companyName })
}

let cachedTaxes = null

async function getTaxes() {
  if (cachedTaxes) return cachedTaxes
  const data = await zohoRequest('get', '/settings/taxes')
  cachedTaxes = data.taxes || []
  return cachedTaxes
}

/**
 * India applies IGST between states, and CGST+SGST within a state.
 * Zoho rejects the wrong one, so we pick based on where the customer is
 * relative to our own registered state.
 */
async function findTaxId(percentage, customerState) {
  if (percentage == null) return undefined

  const rate = Number(percentage)
  const taxes = await getTaxes()

  const isIntraState =
    (customerState || '').trim().toLowerCase() ===
    (env.ZOHO_HOME_STATE || 'telangana').toLowerCase()

  // Intra-state uses the CGST+SGST group; inter-state uses IGST.
  const wanted = isIntraState ? 'GST' : 'IGST'

  const match = taxes.find((t) => {
    const name = (t.tax_name || '').toUpperCase()
    const isGroup = name.startsWith('GST') && !name.startsWith('IGST')
    const isIgst = name.startsWith('IGST')
    const rateMatches = Number(t.tax_percentage) === rate
    return rateMatches && (wanted === 'GST' ? isGroup : isIgst)
  })

  if (!match) {
    console.warn(`No Zoho ${wanted} tax found for rate ${rate}%`)
  }

  return match?.tax_id
}

/**
 * Creates an invoice in Zoho Books for a dispatched order.
 */
export async function createInvoiceForOrder({ contactId, order }) {
  const line_items = await Promise.all(
    order.items.map(async (item) => {
      const product = item.product || {}
      const serials = (item.serialNumbers || []).map((s) => s.serial)

      const descriptionLines = []
      if (serials.length) {
        descriptionLines.push(`SERIAL NO : ${serials.join(', ')}`)
      }
      if (product.productCode) {
        descriptionLines.push(`PRODUCT ID : ${product.productCode}`)
      }

      return {
        name: product.name,
        description: descriptionLines.join('\n') || undefined,
        hsn_or_sac: product.hsnCode || undefined,
        rate: Number(item.unitPrice),
        quantity: item.quantity,
        tax_id: await findTaxId(product.gstRate, order.shippingAddress?.state),
      }
    })
  )

  // State codes Zoho expects for place of supply.
  const STATE_CODES = {
    'andaman and nicobar islands': 'AN', 'andhra pradesh': 'AP',
    'arunachal pradesh': 'AR', assam: 'AS', bihar: 'BR',
    chandigarh: 'CH', chhattisgarh: 'CG',
    'dadra and nagar haveli and daman and diu': 'DN', delhi: 'DL',
    goa: 'GA', gujarat: 'GJ', haryana: 'HR', 'himachal pradesh': 'HP',
    'jammu and kashmir': 'JK', jharkhand: 'JH', karnataka: 'KA',
    kerala: 'KL', ladakh: 'LA', lakshadweep: 'LD', 'madhya pradesh': 'MP',
    maharashtra: 'MH', manipur: 'MN', meghalaya: 'ML', mizoram: 'MZ',
    nagaland: 'NL', odisha: 'OD', puducherry: 'PY', punjab: 'PB',
    rajasthan: 'RJ', sikkim: 'SK', 'tamil nadu': 'TN', telangana: 'TS',
    tripura: 'TR', 'uttar pradesh': 'UP', uttarakhand: 'UK',
    'west bengal': 'WB',
  }

  const shippingState = (order.shippingAddress?.state || '').trim().toLowerCase()
  const placeOfSupply = STATE_CODES[shippingState]

  const data = await zohoRequest('post', '/invoices', {
    data: {
      customer_id: contactId,
      reference_number: order.orderNumber,
      place_of_supply: placeOfSupply,
      line_items,
    },
  })

  return data.invoice
}