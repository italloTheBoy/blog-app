const { Router } = require('express')
const routes = Router()

const Post = require('../../models/Post')

routes.get('/', async (req, res) => {
  try {
    const post = await Post.find().sort({ date: 'desc' }).lean()
    res.render('post/list', { post: post })
  }
  catch (err) {
    req.flash('errMsg', 'Não foi possivel encontrar as postagens, tente mais tarde.')
    res.render('post/list')
  }

})


module.exports = routes
