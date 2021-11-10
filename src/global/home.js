const { Router } = require('express')
const routes = Router()

const Post = require('../../models/Post')


routes.get('/', async (req, res) => {
  try{
    const post = await Post.find().sort({ date: 'desc' }).lean()

    res.render('global/home', { post: post })
  }
  catch (err) {
    res.status(404).redirect('/404')
  }
})


module.exports = routes