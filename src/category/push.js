const { Router } = require('express')
const routes = Router()


const list = require('./list')
routes.use(list)

const add = require('./add')
routes.use(add)


module.exports = routes
