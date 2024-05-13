const Joi = require('joi')

const loginSchema = Joi.object({
  email: Joi.string().required(). email(),
  password: Joi.string().required(),
});

const registerSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6).max(20),
});

module.exports = {
  loginSchemaValidator: (body) => loginSchema.validate(body),
  registerSchemaValidator: (body) => registerSchema.validate(body)
}