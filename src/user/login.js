const passport = require('passport')

const { Router } = require('express')
const routes = Router()


routes.get('/login', (req, res) => {
  res.render('user/login')
})

routes.post('/login', (req, res, next) => {
  
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  })(req, res, next)

})


module.exports = routes