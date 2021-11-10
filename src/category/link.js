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

routes.get('/link/:slug', async ( req, res ) => {
  try {
    const category = Category.findOne({ slug: req.params.slug })

    if ( !category ) {
      res.status(404).redirect('/404')
    }
    else {
      const post = Post.find({ category: category.id }) 
  
      res.status(200).render('category/linked', { post:post })
    }

  } catch ( err ) {
      req.flash('errMsg', '500: Erro interno do servidor, tente novamente mais tarde')
      res.status(500).redirect('/')
  }
})


module.exports = routes