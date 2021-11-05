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

})


module.exports = routes