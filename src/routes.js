const { Router } = require('express')
const routes = Router()


const global = require('./global/push')
routes.use(global)

const category = require('./category/push')
routes.use('/category', category)

const post = require('./post/push')
routes.use('/post', post)

const user = require('./user/push')
routes.use('/user', user)

module.exports = routes