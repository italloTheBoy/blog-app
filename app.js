const path = require('path')
const mongoose = require('mongoose')
const express = require('express')
const handlebars = require('express-handlebars')

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
  
  
  
const routes = require('./src/routes')
app.use(routes)
  

const PORT = 38456
app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`)
})