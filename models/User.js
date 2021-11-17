const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  name:     { type: String, required: true, },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6, },
  adm:      { type: Number, default:  0, }
})

const User = model('users', userSchema)

module.exports = User