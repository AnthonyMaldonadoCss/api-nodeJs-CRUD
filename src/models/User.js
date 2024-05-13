const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const { allowedRoles } = require('../config');

const userSchema = new Schema({
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
}, { timestamps: true });

userSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash
}

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}

userSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user
}


module.exports = model('User', userSchema)