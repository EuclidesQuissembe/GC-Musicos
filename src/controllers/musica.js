// Importando Funções
const Artista = require('../models/artista')
const Album = require('../models/album')
const Musica = require('../models/musica')
const Genero = require('../models/genero')
const slugFormatter = require('../helpers/slug-formatter')
const Event = require('./event')

async function index(req, res) {
  // Pegando todas as músicas
  const musicas = await Musica.find()
    .populate('idAlbum', 'titulo')

  res.render('musicas', { musicas })
}

async function PegarIDsArtistas(req) {

  // Dados do formulário
  const { artista } = req.body

  // Pegando todos os artistas da base de dados
  let todosArtistas = await Artistas()
  // Pegando todos os artistas passados do formulário
  let artistasForm = artista.split(',')
  // ids dos artistas
  let idArtistas = []

  // Adicionando os _ids dos artistas no array
  todosArtistas.map((artista) => {
    for (let i = 0; i < artistasForm.length; i++) {
      if (artista.nome == artistasForm[i]) {
        idArtistas.push(artista._id)
        break;
      }
    }
  })

  return idArtistas
}

async function PegarIdAlbum(req) {

  // Dados findo do formulário
  const { album } = req.body

  // Pegando todos os albuns da base de dados
  let todosAlbuns = await Albuns()
  // ids dos albuns
  let idAlbum;

  // Adicionando os _ids dos artistas no array
  todosAlbuns.map((alb) => {
    if (alb.titulo == album) {
      idAlbum = alb._id
    }
  })

  return idAlbum
}

async function create(req, res) {

  // Dados findo do formulário
  const { titulo, descricao, letra, duracao, ano, genero } = req.body

  // Pegando os ID's dos artistas
  let idArtistas = await PegarIDsArtistas(req)

  // Pegando o ID do album
  let idAlbum = await PegarIdAlbum(req)

  // Criando a URL Amigável do título da música
  var slug = slugFormatter(titulo)

  // Pegar os dados do formulário e internamente
  let dados = {
    titulo,
    slug,
    descricao,
    letra,
    duracao,
    ano,
    genero,
    idArtistas,
    idAlbum
  }

  // Criando o artista
  await Musica.create(dados)

  // Guardando o Evento
  await Event.create('Adicionaste uma nova música', req)

  // Redirecionando
  req.flash('success_log', 'Música adicionada com sucesso')
  res.redirect('/musicas')

}

async function update(req, res) {
  let { slug } = req.params

  await Musica.findOne({ slug })
    .then(async musica => {
      if (!musica) { // Verificando a existência da música
        req.flash('error_log', 'Não existe nenhuma música com esse nome')
        res.redirect('/admin/musicas')
        return
      }

      // Pegando os dados vindo do formulário
      let dados = { ...req.body }

      // Pegando os ID's dos artistas
      dados.idArtistas = await PegarIDsArtistas(req)

      // Pegando o ID do album
      dados.idAlbum = await PegarIdAlbum(req)

      // Criando a URL amigável
      dados.slug = slugFormatter(dados.titulo)

      // Atualizando os dados
      await Musica.findOneAndUpdate({ slug }, dados)

      // Criando a mensagem de sucesso
      req.flash('success_log', 'Música atualizada com sucesso')

      // Redirecionando o utilizador
      res.redirect('/admin/musicas')
    })
    .catch(err => {
      // Criando a mensagem de erro
      req.flash('error_log', err.message)
      // Redirecionando o utilizador
      res.redirect('/admin/musicas')
    })
}

async function detalhe(req, res) {
  // Dados vindo dos parâmetros
  let { slug } = req.params

  const musica = await Musica.findOne({ slug })
    .populate('idArtistas', 'nome slug')
    .populate('genero', 'nome')
    .populate('idAlbum', 'titulo slug')

  res.render('musica/musica', { musica })
}

async function Artistas() {
  return await Artista.find()
}

async function Albuns() {
  return await Album.find()
}

async function adicionar(req, res) {
  const generos = await Genero.find()
  const artistas = await Artista.find()
  const albuns = await Album.find()

  res.render('admin/musica/adicionar', { generos, artistas, albuns })
}

async function editar(req, res) {
  // Buscando dados relacionado as músicas
  const generos = await Genero.find({}, 'nome')
  const todosArtistas = await Artista.find({}, 'nome')
  const todosAlbuns = await Album.find({}, 'titulo')

  // Pegando o slug passado por parâmetro
  let { slug } = req.params

  // Buscando a música de acordo com o slug
  const musica = await Musica.findOne({ slug })

  // Buscando o(s) artista(s) da música
  let artistas = []
  await musica.idArtistas.map(async id => {
    const artista = await Artista.findById(id, 'nome')

    artistas.push(artista)
  })

  // Buscando o album onde pertence a música, caso exista
  let album = {}
  if (musica.idAlbum != null) {
    const response = await Album.findById(musica.idAlbum, 'titulo')

    album = { ...response._doc }
  }

  // Mostrando os dados encontrados
  res.render('admin/musica/editar', {
    musica,
    album,
    todosAlbuns,
    artistas,
    todosArtistas,
    generos
  })
}

module.exports = { index, detalhe, create, update, adicionar, editar }