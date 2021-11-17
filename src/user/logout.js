const { checklogin } = require('../../helpers/checkLogin')
const { Router } = require('express')
const routes = Router()


routes.get('/logout', checklogin, (req, res) => {

  req.logout()
  res.status(200).redirect('/login')

})


module.exports = routes
