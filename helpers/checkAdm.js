module.exports = {

  checkAdm: (req, res, next) => {

    if (req.isAuthenticated() && req.user.adm === 1) {
      return next()
    }

    res.status(403).redirect('/403')

  }

}