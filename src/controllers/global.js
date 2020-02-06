// Importando Models
const Artista = require('../models/artista')
const Album = require('../models/album')
const Musica = require('../models/musica')

async function adminArtistas(req, res) {
  const artistas = await Artista.find()

  res.render('admin/artistas', { artistas })
}

async function adminAlbuns(req, res) {
  const albuns = await Album.find()

  res.render('admin/albuns', { albuns })
}

async function adminMusicas(req, res) {
  const musicas = await Musica.find()

  res.render('admin/musicas', { musicas })
}

async function home(req, res) {
  const artistas = await Artista.find({}, 'nome slug descricao')

  // Pegando Três artistas diferentes para colocá-los na home
  let tresArtistas = [], i = 0, numbers = ''
  while (i < 3) {
    let random = parseInt(Math.random() * artistas.length)

    if (!numbers.match(random)) {
      tresArtistas.push(artistas[random])
      numbers += random.toString()
      i++
    }
  }

  res.render('home', { tresArtistas })
}

async function search(req, res) {
  
  let {search } = req.query

  res.render('search')
}

async function terminarSessao(req, res) {
  req.logout()
  req.flash('success_log', 'Sessão Terminada')
  res.redirect('/')
}

module.exports = {
  home,
  search,
  adminArtistas,
  adminAlbuns,
  adminMusicas,
  terminarSessao
}