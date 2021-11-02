const { Router } = require('express')
const routes = Router()

const Category = require('../../models/Category')


routes.get('/add', (req, res) => {
  res.render('category/add')
})

routes.post('/add/post', (req, res) => {
  let err = []

  if (!req.body.name) {
    err.push({msg: 'Insira um nome'})
  }else if (!Category.findOne({name: req.body.name}) == true ) {
    err.push({msg: 'Este nome ja existe'})
  }

  if (!req.body.slug) {
    err.push({msg: 'Insira uma slug'})
  }else if (req.body.slug.indexOf(' ') != -1 || req.body.slug.toLowerCase() != req.body.slug) {
    err.push({msg: 'Insira uma slug valida'})
  }else if (!Category.findOne({slug: req.body.slug}) == true ) {
    err.push({msg: 'Esta slug ja existe'})
  }


  if (err.length != 0) {
    res.render('category/add', {err: err})
  }else {
    new Category({
      name: req.body.name,
      slug: req.body.slug,
    }).save()

    res.redirect('/category')
  }
})


module.exports = routes