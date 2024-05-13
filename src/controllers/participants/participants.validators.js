const joi = require('joi');

const participantsSchema = joi.object({
  name: joi.string().required(),
  lastName: joi.string().required(),
  phone: joi.number().required(),
})

module.exports = { 
  RegisterParticipantsSchema: (participants) => participantsSchema.validate(participants),
}