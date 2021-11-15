const { Router } = require('express')
const routes = Router()


const signup = require('./signup')
routes.use(signup)

const login = require('./login')
routes.use(login)


module.exports = routes
