const { Router } = require('express')
const routes = Router()

const Category = require('../../models/Category')


routes.get('/add', (req, res) => {
  res.render('category/add')
})

routes.post('/add/post', (req, res) => {
  const name = req.body.name.trim().toLowerCase()
  const slug = req.body.slug.trim().toLowerCase()

  let err = []

  if (!name || name.length == 0) {
    err.push({msg: 'Insira um nome'})
  }else {
    Category.findOne({name: name}).then(category => {
      if (category) {
        err.push({msg: 'Este nome ja existe.'}) 
      }
    })
  }

  if (!slug || slug.length == 0) {
    err.push({msg: 'Insira uma slug'})
  }else if (slug.indexOf(' ') != -1) {
    err.push({msg: 'Slug Invalida'})
  }else {
    Category.findOne({slug: slug}).then(category => {
      if (category) {
        err.push({msg: 'Esta slug ja existe.'}) 
      }
    })
  }
  
  if (err.length != 0) {
    res.render('category/add', {err: err})
  }else {
    new Category({
      name: name,
      slug: slug,
    }).save()
      .then(() => {
        res.redirect('/category/')
      })
  }
})

module.exports = routes