// Importando módulos
const express = require('express')
const passport = require('passport')

// Helpers
const { eAdmin } = require('./helpers/acesso')

// Funções
const router = express.Router()

// Controllers
const c_artista = require('./controllers/artista')
const c_album = require('./controllers/album')
const c_musica = require('./controllers/musica')
const c_gobal = require('./controllers/global')
const c_utilizador = require('./controllers/utilizador')

// Routes
const r_admin = require('./routes/admin')

// =============== Use =====================
router.use('/admin', eAdmin, r_admin)
// ============ Fim do Use =================

// =============== GET =====================
router.get('/', c_gobal.home)
router.get('/pesquisa', c_gobal.search)

router.get('/artistas', c_artista.index)
router.get('/artista/:slug', c_artista.detalhe)

router.get('/albuns', c_album.index)
router.get('/album/:slug', c_album.detalhe)

router.get('/musicas', c_musica.index)
router.get('/musica/:slug', c_musica.detalhe)

router.get('/perfil/:username', c_utilizador.detalhe)

// Rota para terminar sessão
router.get('/terminar-sessao', c_gobal.terminarSessao)
// ========= Fim das rotas GET =============

// =============== POST =====================
// ::::::::::::::: Create ::::::::::::::::::::::
router.post('/criar-conta', c_utilizador.create)
// :::::::::: Fim das Rotas Create ::::::::::::::

// Rota para Iniciar Sessão
router.post('/iniciar-sessao', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash: true
  })(req, res, next)
})

// ========= Fim das rotas POST =============
module.exports = router