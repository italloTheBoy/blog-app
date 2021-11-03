const { Schema, model } = require('mongoose')


const categorySchema = new Schema({
  name: {type: String, required: true, unique: true},
  slug: {type: String, required: true, unique: true},
  date: {type: Date  , default:  Date.now()}
})

const Category = model('categories', categorySchema)


module.exports = Category