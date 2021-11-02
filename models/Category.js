const { Schema, model } = require('mongoose')


const categorySchema = new Schema({
  name: {type: 'string', required: true, unique: true},
  slug: {type: 'string', required: true, unique: true},
})

const Category = model('categories', categorySchema)


module.exports = Category