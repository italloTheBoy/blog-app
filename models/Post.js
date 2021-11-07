const { Schema, model } = require('mongoose')

const postSchema = new Schema({
  title:       { type: String, required: true },
  slug:        { type: String, required: true },
  description: { type: String, required: true },
  content:     { type: String, required: true },
  date:        { type: Date,   default: Date.now() },
  category:    { type: Schema.Types.ObjectId, ref: 'categories', required: true },
})

const Post = model('posts', postSchema)

module.exports = Post
