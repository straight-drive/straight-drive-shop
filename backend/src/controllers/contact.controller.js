import { asyncHandler } from '../utils/asyncHandler.js'
import { ok, created } from '../utils/apiResponse.js'
import * as contactService from '../services/contact.service.js'

export const postContact = asyncHandler(async (req, res) => {
  const message = await contactService.createContactMessage(req.body, req.user?.id)
  created(res, message, 'Your message has been sent. We will get back to you soon.')
})

export const getMyMessages = asyncHandler(async (req, res) => {
  const messages = await contactService.listMyMessages(req.user.id)
  ok(res, messages)
})

export const getContactMessages = asyncHandler(async (req, res) => {
  const messages = await contactService.listContactMessages()
  ok(res, messages)
})

export const putContactHandled = asyncHandler(async (req, res) => {
  const message = await contactService.toggleHandled(req.params.id)
  ok(res, message, 200, 'Updated')
})