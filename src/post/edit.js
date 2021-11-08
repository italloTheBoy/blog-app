const { Router } = require('express')
const routes = Router()

const Category = require('../../models/Category')
const Post = require('../../models/Post')


routes.get('/edit/:id', async (req, res) => {
  const id = req.params.id

  try {
    if (id.length != 24) {
      throw new Error('Id invalido')
    }

    const post = await Post.findById(id).lean().populate('category')
    
    if (!post) {
      throw new Error('Id invalido')
    } 

    const category = await Category.find().lean()

    res.render('post/edit', { post: post, category: category})
  }
  catch (err) {
    res.status(404).redirect('/404')
  }
})

routes.post('/edit/post', async (req, res) => {
  const id = req.body.id

  const title = req.body.title.toLowerCase().trim()
  const slug  = req.body.slug.toLowerCase().trim()  
  
  const description = req.body.description.trim()
  const content     = req.body.content.trim()
  
  const category    = String(req.body.category.trim())


  // Valid
  let err = []

  try {
    if (!id || id.length != 24) {
      throw new Error('Id invalido')
    } 
  }
  catch (err) {
    req.flash('errMsg', 'Ocorreu um erro interno, tente novamente mais tarde')
    res.redirect(`/post`)
  }

  if (!title || title === '') {
    err.push({msg: 'Insira um titulo'})
  }

  if (!slug || slug === '') {
    err.push({msg: 'Insira uma slug'})
  }
  else if (slug.indexOf(' ') != -1) {
    err.push({msg: 'Slug invalida'})
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
      res.redirect(`/post/edit/${id}`)
    }
  }

  // Redirect
  if (err.length > 0) {
    res.render('post/edit', {err: err})
  }
  else {
    try {
      await Post.findByIdAndUpdate(id, { title, slug, description, content, category })

      req.flash('susMsg', 'Postagem editada')
      res.redirect('/post')
    }
    catch (err) {
      req.flash('errMsg', 'Ocorreu um erro interno tente novamente mais tarde')
      res.redirect('/post/add')
    }
  }
})



module.exports = routes