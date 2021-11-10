const { Router } = require('express')
const routes = Router()


const home = require('./home')
routes.use(home)


module.exports = routes