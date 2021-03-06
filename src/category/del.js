const { Router } = require('express')
const routes = Router()

const Category = require('../../models/Category') 


routes.post('/del', async (req, res) => {
  const id = req.body.id

  try {
    if (id.length != 24) {
      throw new Error('Id invalido')
    } 
    
    const category = await Category.findById(id)
    
    if (!category) {
      throw new Error('Id invalido')
    } 
    
    await category.remove()

    req.flash('susMsg', 'Categoria deletada')
    res.redirect('/category')
  }
  catch (err) {
    req.flash('errMsg', 'Ocorreu um erro. Tente nomamente mais tarde')
    res.redirect('/category')
  }
  

})


module.exports = routes