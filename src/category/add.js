const { Router } = require('express')
const routes = Router()

const Category = require('../../models/Category')


routes.get('/add', (req, res) => {
  res.render('category/add')
})


routes.post('/add/post', async (req, res) => {
  const name = req.body.name.toLowerCase().trim()
  const slug = req.body.slug.toLowerCase().trim()
  
  // Valid
  let err = []

  if (!name || name === '') {
    err.push({msg: 'Insira um nome'})
  }
  else {
    await Category.findOne({name: name}).then(category => {
      if (category) {
        err.push({msg: 'Este nome ja esta sendo usado'})
      }
    })
  }

  if (!slug || slug === '') {
    err.push({msg: 'Insira uma slug'})
  }
  else if (slug.indexOf(' ') != -1) {
    err.push({msg: 'Slug invalida'})
  }
  else {
    await Category.findOne({slug: slug}).then(category => {
      if (category) {
        err.push({msg: 'Esta slug ja esta sendo usada'})
      }
    })
  }

  // Redirect
  if (err.length > 0) {
    res.render('category/add', {err: err})
  }
  else {
    try {
      await new Category({ name, slug }).save()
      
      req.flash('susMsg', 'Categoria criada')
      res.redirect('/category')
    }
    catch (err) {
      req.flash('errMsg', 'Ocorreu um erro interno tente novamente mais tarde')
      res.redirect('/category')
    }
  }
})


module.exports = routes