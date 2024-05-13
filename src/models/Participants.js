const { Schema, model } = require('mongoose');

const participantsSchema = new Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true 
  },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
}, { timestamps: true });

module.exports = model('Participants', participantsSchema)