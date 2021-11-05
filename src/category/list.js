const { Router } = require('express')
const routes = Router()

const Category = require('../../models/Category')

routes.get('/', async (req, res) => {
  try {
    const category = await Category.find().sort({date: 'desc'}).lean()
    res.render('category/list', { category: category })
  }
  catch (err) {
    req.flash('errMsg', 'Não foi possivel encontrar as categorias tente mais tarde')
    res.render('category/list')
  }

})


module.exports = routes