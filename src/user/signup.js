const { Router } = require('express')
const routes = Router()

const User = require('../../models/User')


routes.get('/signup', async (req, res) => {
  res.render('user/signup')
})


module.exports = routes