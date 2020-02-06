// Importando os módulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')

require('../config/auth')(passport)

// Helpers
const { acesso } = require('../helpers/acesso')

// Objectos
const app = express()

// ================= Configurações =======================
// Session
app.use(session({
  secret: 'github',
  resave: true,
  saveUninitialized: true
}))

// Passport
app.use(passport.initialize())
app.use(passport.session())

// Mensagens Globais
app.use(flash())

// Template Engine
app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Corpo da requisição
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Middleware
app.use((req, res, next) => {
  res.locals.error_log = req.flash('error_log')
  res.locals.success_log = req.flash('success_log')
  res.locals.error = req.flash('error')
  res.locals.utilizador = req.user || null
  res.locals.eAdmin = acesso(req)
  next()
})

// ============ Fim das Configurações =====================

// Exportação
module.exports = app