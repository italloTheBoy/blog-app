const { Router } = require('express')
const routes = Router()


const category = require('./category/push')
routes.use('/category', category)

module.exports = routes