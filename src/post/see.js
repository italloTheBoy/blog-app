const { Router } = require('express')
const routes = Router()

const Post = require('../../models/Post')


routes.get('/see/:slug', async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).lean().populate('category')

    if (!post) { 
      res.status(404).redirect('/404')
    }
    else {
      res.render('post/see', { post: post })
    }

  }
  catch (err) {
    req.flash('errMsg', 'Ocorreu um erro interno, tente novamente mais tarde')
    res.redirect('/post')
  }

})


module.exports = routes