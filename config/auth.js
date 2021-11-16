const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt   = require('bcrypt')

const User = require('../models/User')

module.exports = (passport) => {
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {

    User.findOne({ email: email })
      .then((user) => {

        if (!user) {
          return done(null, false, { message: 'Email ou senha incorretas' })
        }

        bcrypt.compare(password, user.password, (err, result) => {

          if (result) {
            return done(null, user)
          }
          else {
            return done(null, false, { message: 'Email ou senha incorretas' })
          }

        })
      })

      passport.serializeUser((user, done) => {
        done(null, user.id)
      })

      passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
          done(err, user)
        })
      })
    
  }))
}