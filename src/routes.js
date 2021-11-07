const { Router } = require('express')
const routes = Router()


routes.get('/', (req, res) => {
  res.send('oi')
})

const category = require('./category/push')
routes.use('/category', category)

const post = require('./post/push')
routes.use('/post', post)

module.exports = routes