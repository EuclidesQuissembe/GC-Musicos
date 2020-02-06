// Importando módulos
const express = require('express')
const path = require('path')

const { eAdmin } = require('./src/helpers/acesso')

// Database
require('./src/config/database')

// Objectos
const app = require('./src/config/app')

// =============== Middlewares ============================
// Routes
const routes = require('./src/routes')
app.use('/', routes)

// Public
app.use(express.static(path.join(__dirname, 'public')))

// =============== Fim dos Middlewares ====================

module.exports = app