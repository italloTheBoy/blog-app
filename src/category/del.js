const { Router } = require('express')
const routes = Router()

const Category = require('../../models/Category') 


routes.post('/del', async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.body.id)

    req.flash('susMsg', 'Categoria deletada')
    res.redirect('/category')
  }
  catch (err) {
    req.flash('errMsg', 'Ocorreu um erro. Tente nomamente mais tarde')
    res.redirect('/category')
  }
  

})


module.exports = routes