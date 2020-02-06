// Importando módulos
const express = require('express')

// Funções
const router = express.Router()

// Controllers
const c_gobal = require('../controllers/global')
const c_artista = require('../controllers/artista')
const c_album = require('../controllers/album')
const c_musica = require('../controllers/musica')
const c_genero = require('../controllers/genero')

// =============== GET =====================
router.get('/artistas', c_gobal.adminArtistas)
router.get('/editar-artista/:slug', c_artista.editar)
router.get('/adicionar-artista', c_artista.adicionar)

router.get('/albuns', c_gobal.adminAlbuns)
router.get('/editar-album/:slug', c_album.editar)
router.get('/adicionar-album', c_album.adicionar)

router.get('/musicas', c_gobal.adminMusicas)
router.get('/editar-musica/:slug', c_musica.editar)
router.get('/adicionar-musica', c_musica.adicionar)

router.get('/generos', c_genero.index)
router.get('/genero/adicionar', (req, res) => {
  res.render('admin/genero/adicionar')
})
// ========= Fim das rotas GET =============

// =============== POST =====================

// ::::::::::::::: Create ::::::::::::::::::::::
router.post('/adicionar-artista', c_artista.create)

router.post('/adicionar-album', c_album.create)

router.post('/adicionar-musica', c_musica.create)

router.post('/genero/adicionar', c_genero.create)
// :::::::::: Fim das Rotas Create ::::::::::::::

// ::::::::::::::: Update ::::::::::::::::::::::
router.post('/editar-artista/:slug', c_artista.update)

router.post('/editar-musica/:slug', c_musica.update)

router.post('/editar-album/:slug', c_album.update)
// :::::::: Fim das rotas Update :::::::::::::::

// ========= Fim das rotas POST =============

// Exportaçãos
module.exports = router