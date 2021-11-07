const { Router } = require('express')
const routes = Router()

const Category = require('../../models/Category')


routes.get('/edit/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).lean()

    res.render('category/edit', { category: category })
  }
  catch (err) {
    res.redirect('/404')
  }
})

routes.post('/edit/post', async (req, res) => {
  const name = req.body.name.toLowerCase().trim()
  const slug = req.body.slug.toLowerCase().trim()
  const id   = req.body.id
  
  // Valid
  let err = []

  if (!name || name === '') {
    err.push({msg: 'Insira um nome'})
  }
  else {
    await Category.findOne({name: name}).then(category => {
      if (category  && category.name !== name) {
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
      if (category && category.slug !== slug) {
        err.push({msg: 'Esta slug ja esta sendo usada'})
      }
    })
  }

  // Redirect
  if (err.length > 0) {
    res.render('category/edit', {err: err})
  }
  else {
    try {
      await Category.findByIdAndUpdate(id, {name: name, slug: slug})
      
      req.flash('susMsg', 'Categoria Editada')
      res.redirect('/category')
    }
    catch (err) {
      req.flash('errMsg', 'Ocorreu um erro interno tente novamente mais tarde')
      res.redirect('/category')
    }
  }
})


module.exports = routes