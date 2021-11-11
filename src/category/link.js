const { Router } = require('express')
const routes = Router()

const Category = require('../../models/Category')
const Post = require('../../models/Post')



routes.get('/link', async ( req, res ) => {
  try {
    const category = await Category.find().sort({ date: 'desc' }).lean()

    res.status(200).render('category/link', { category: category })
  } 
  catch (err) {
    req.flash('errMsg', '500: Erro Interno do Servidor, novamente mais tarde')
    res.status(500).redirect('/')
  }
})

routes.get('/linked/:slug', async ( req, res ) => {
  const slug = req.params.slug

  try {
    const category = await Category.findOne({ slug: slug }).lean()

    if (!category) {
      res.status(404).redirect('/404')
    }
    else {
      const post = await Post.find({ category: category }).lean().sort({ date: 'desc' })

      res.status(200).render('category/linked', { post: post, category: category })
    }

  } catch ( err ) {
      req.flash('errMsg', '500: Erro interno do servidor, tente novamente mais tarde')
      res.status(500).redirect('/')
  }
})


module.exports = routes