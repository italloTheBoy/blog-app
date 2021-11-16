// Loads
const path = require('path')
const mongoose = require('mongoose')
const express = require('express')
const handlebars = require('express-handlebars')
const session = require('express-session')
const passport = require('passport')
require('./config/auth')(passport)
const flash = require('connect-flash')


// Configuration
  // Express
  const app = express()
  
  app.use(express.urlencoded({extended: false}))
  app.use(express.json())
  
  // Handlebars
  app.engine('handlebars', handlebars({defaultLayout: 'main'}))
  app.set('view engine', 'handlebars')

  // Static
  app.use(express.static(path.join(__dirname, 'public')))

  // Mongoose
  mongoose.connect('mongodb://localhost/blog')

  // Session
  app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }))

  // Passport
  app.use(passport.initialize())
  app.use(passport.session())

  // Flash
  app.use(flash())

  app.use((req, res, next) => {
    res.locals.susMsg = req.flash('susMsg')
    res.locals.errMsg = req.flash('errMsg')
    res.locals.error  = req.flash('error')
    
    next()
  })
  
  
// Routes
const routes = require('./src/routes')
app.use(routes)
  

// Listen
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`)
})