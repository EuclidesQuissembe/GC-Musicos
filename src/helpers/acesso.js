module.exports = {
  eAdmin: (req, res, next) => {
    if (req.isAuthenticated()) {
      if (req.user.eAdmin === 1) {
        next()
      } else {
        req.flash('error_log', 'Acesso negado')
        res.redirect('/')
      }
    } else {
      req.flash('error_log', 'Deves iniciar sessão')
      res.redirect('/')
    }
  },
  acesso(req) {
    return req.isAuthenticated() && req.user.eAdmin === 1
  }
}