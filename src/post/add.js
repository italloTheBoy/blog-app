const { Router } = require('express')
const routes = Router()

const Category = require('../../models/Category')
const Post = require('../../models/Post')


routes.get('/add', async (req, res) => {
  try {
    const category = await Category.find().sort({ date: 'desc' }).lean()
    res.render('post/add', { category: category })
  } 
  catch (err) {
    console.log('err')
    res.redirect('/404')
  }
})


routes.post('/add/post', async (req, res) => {
  const title = req.body.title.toLowerCase().trim()
  const slug  = req.body.slug.toLowerCase().trim()  
  
  const description = req.body.description.trim()
  const content     = req.body.content.trim()
  
  const category    = String(req.body.category.trim())


  // Valid
  let err = []

  if (!title || title === '') {
    err.push({msg: 'Insira um titulo'})
  }

  if (!slug || slug === '') {
    err.push({msg: 'Insira uma slug'})
  }
  else if (slug.indexOf(' ') != -1) {
    err.push({msg: 'Slug invalida'})
  } 
  else {
    try {
      const slugVal = await Post.findOne({ slug: slug }) 

      if (slugVal) {
        err.push({ msg: 'Slug ja exite' })
      }
    }
    catch (err) {
      req.flash('errMsg', 'Ocorreu um erro interno, tente novamente mais tarde')
      res.redirect('/post/add')
    }
  }

  if (!description || description === '') {
    err.push({ msg: 'Insira uma descrição' })
  }

  if (!content || content === '') {
    err.push({ msg: 'Insira um conteudo' })
  } 

  if (!category || category === '') {
    err.push({ msg: 'Insira uma categoria' })
  }
  else if (category.length != 24) {
    err.push({ msg: 'Categoria invalida' })
  }
  else {
    try {
      const categoryVal = await Category.findOne({ _id: category })

      if (!categoryVal) {
        err.push({ msg: 'Categoria invalida' })
      }
    }
    catch (err) {
      req.flash('errMsg', 'Ocorreu um erro interno, tente novamente mais tarde')
      res.redirect('/post/add')
    }
  }

  // Redirect
  if (err.length > 0) {
    res.render('post/add', {err: err})
  }
  else {
    try {
      await new Post({ title, slug, description, content, category }).save()
      
      req.flash('susMsg', 'Postagem feita')
      res.redirect('/post')
    }
    catch (err) {
      req.flash('errMsg', 'Ocorreu um erro interno tente novamente mais tarde')
      res.redirect('/post/add')
    }
  }
})


module.exports = routes
