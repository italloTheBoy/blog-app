module.exports = {

  checklogin: (req, res, next) => {

    if (req.isAuthenticated()) {
      return next()
    }

    res.status(403).redirect('/403')

  }

}