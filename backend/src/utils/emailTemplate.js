const BRAND = {
  navy: '#060F21',
  card: '#0D1F3A',
  cyan: '#00B5DF',
  green: '#52BC84',
  ink: '#EAF2F7',
  muted: '#8FA1AE',
  line: 'rgba(0,181,223,.16)',
}

export function wrapEmail({ heading, intro, bodyHtml = '', ctaLabel, ctaUrl, footerNote }) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:${BRAND.navy};font-family:Arial,Helvetica,sans-serif;color:${BRAND.ink}">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.navy};padding:32px 16px">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${BRAND.card};border:1px solid ${BRAND.line};border-radius:14px;overflow:hidden">

        <tr><td style="padding:28px 32px;border-bottom:1px solid ${BRAND.line}">
          <div style="font-size:18px;font-weight:bold;letter-spacing:.04em;color:${BRAND.ink}">STRAIGHT DRIVE</div>
          <div style="font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:${BRAND.cyan};margin-top:4px">Play the Future</div>
        </td></tr>

        <tr><td style="padding:32px">
          <h1 style="margin:0 0 12px;font-size:22px;color:${BRAND.ink}">${heading}</h1>
          ${intro ? `<p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:${BRAND.muted}">${intro}</p>` : ''}
          ${bodyHtml}
          ${ctaLabel && ctaUrl ? `
          <table role="presentation" cellpadding="0" cellspacing="0" style="margin:26px 0 0">
            <tr><td style="background:${BRAND.cyan};border-radius:6px">
              <a href="${ctaUrl}" style="display:inline-block;padding:13px 26px;font-size:14px;font-weight:bold;letter-spacing:.06em;text-transform:uppercase;color:${BRAND.navy};text-decoration:none">${ctaLabel}</a>
            </td></tr>
          </table>` : ''}
        </td></tr>

        <tr><td style="padding:22px 32px;border-top:1px solid ${BRAND.line}">
          ${footerNote ? `<p style="margin:0 0 10px;font-size:12px;color:${BRAND.muted}">${footerNote}</p>` : ''}
          <p style="margin:0;font-size:12px;line-height:1.6;color:${BRAND.muted}">
            Straight Drive Sports &amp; Leisure Pvt. Ltd.<br>
            info@straightdrivesport.com · +91 90009 88633
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export function orderItemsTable(order) {
  const rows = (order.items || [])
    .map(
      (item) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid ${BRAND.line};font-size:14px;color:${BRAND.ink}">
          ${item.product?.name || 'Product'} &times; ${item.quantity}
        </td>
        <td style="padding:10px 0;border-bottom:1px solid ${BRAND.line};font-size:14px;color:${BRAND.ink};text-align:right">
          &#8377;${(Number(item.unitPrice) * item.quantity).toLocaleString('en-IN')}
        </td>
      </tr>`
    )
    .join('')

  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 0">
    ${rows}
    <tr>
      <td style="padding:12px 0 0;font-size:13px;color:${BRAND.muted}">Subtotal</td>
      <td style="padding:12px 0 0;font-size:13px;color:${BRAND.muted};text-align:right">&#8377;${Number(order.subtotal).toLocaleString('en-IN')}</td>
    </tr>
    <tr>
      <td style="padding:4px 0 0;font-size:13px;color:${BRAND.muted}">GST</td>
      <td style="padding:4px 0 0;font-size:13px;color:${BRAND.muted};text-align:right">&#8377;${Number(order.tax).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
    </tr>
    <tr>
      <td style="padding:10px 0 0;font-size:16px;font-weight:bold;color:${BRAND.ink}">Total</td>
      <td style="padding:10px 0 0;font-size:16px;font-weight:bold;color:${BRAND.ink};text-align:right">&#8377;${Number(order.total).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
    </tr>
  </table>`
}