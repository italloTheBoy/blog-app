const { Router } = require('express')
const routes = Router()


routes.get('/', (req, res) => {
  res.render('category/list')
})


module.exports = routes