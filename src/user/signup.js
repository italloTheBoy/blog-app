const { Router } = require('express')
const routes = Router()

const User = require('../../models/User')

const bcrypt = require('bcrypt')


routes.get('/signup', (req, res) => {
  res.render('user/signup')
})

routes.post('/signup/post', async (req, res) => {
  // Auth
  const { name, email, password, confirm } = req.body

  const err = []

  if (!name || name.trim() == '') {
    err.push({ msg: 'Insira um nome' })
  }

  if (!email || email.trim() == '') {
    err.push({ msg: 'Insira um email' })
  }
  else {
    try {
      const checkEmail = await User.findOne({ email: email })

      if ( checkEmail ) {
        err.push({ msg: 'Este email ja existe'})
      }
    }
    catch (err) {
      req.flash('errMsg', '500: Ocorreu um erro interno, tente novamente mais tarde')
      return res.status(500).redirect('/login')
    }

  }

  if (!password || password.trim() == '') {
    err.push({ msg: 'Insira uma senha' })
  } 
  else if (password.trim().length < 6) {
    err.push({ msg: 'A senha deve ter no minimo 6 caracteres'})
  }

  if (!confirm || confirm.trim() == '') {
    err.push({ msg: 'Confirme sua senha' })
  }
  else if ( confirm != password ) {
    err.push({ msg: 'A senha esta difierente da confirmação'})
  }

  // 401
  if (err.length != 0) {
    return res.status(401).render('user/signup', { err: err })
  }

  // Gen hash
  const salt = await bcrypt.genSalt(12)
  const hash = await bcrypt.hash(password, salt) 

  // 200
  try {
    await new User({ name, email, password: hash }).save()
    
    req.flash('susMsg', 'Usuario criado')
    return res.status(200).redirect('/login')
  }
  // 500
  catch (err) {
    req.flash('errMsg', '500: Ocorreu um erro interno, tente novamente mais tarde')
    return res.status(500).redirect('/login')
  }
})


module.exports = routes