const { Router } = require('express')
const routes = Router()


const signup = require('./signup')
routes.use(signup)


module.exports = routes
