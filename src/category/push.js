const { Router } = require('express')
const routes = Router()


const list = require('./list')
routes.use(list)

const add = require('./add')
routes.use(add)

const del = require('./del')
routes.use(del)

const edit = require('./edit')
routes.use(edit)

const link = require('./link')
routes.use(link)


module.exports = routes
