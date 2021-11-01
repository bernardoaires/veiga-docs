import Joi from 'joi'

export const registerSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  username: Joi.string().trim().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
})

export const loginSchema = Joi.object().keys({
  username: Joi.string().trim().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
})

export const getDocumentsByUserIdSchema = Joi.object().keys({
  userId: Joi.string().required()
})