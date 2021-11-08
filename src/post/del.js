const { Router } = require('express')
const routes = Router()

const Post = require('../../models/Post') 


routes.post('/del', async (req, res) => {
  const id = req.body.id

  try {
    if (id.length != 24) {
      throw new Error('Id invalido')
    }

    const post = await Post.findById(id)
    
    if (!post) {
      throw new Error('Id invalido')
    } 
    
    await post.remove()

    req.flash('susMsg', 'Postagem deletada')
    res.redirect('/post')
  }
  catch (err) {
    req.flash('errMsg', 'Ocorreu um erro. Tente nomamente mais tarde')
    res.redirect('/post')
  }
})


module.exports = routes