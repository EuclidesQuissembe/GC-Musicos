// Importando módulos
const Artista = require('../models/artista')
const Album = require('../models/album')
const Musica = require('../models/musica')

// Importando Funções
const slugFormatter = require('../helpers/slug-formatter')

async function index(req, res) {

  // Pegando todos os albuns
  const response = await Album.find()
  // Array para pegar os albuns e adicionar a quantidade de músicas
  const albuns = []

  // Percorrendo cada album
  await response.map(async album => {
    // Pegando as músicas de cada album percorrido
    const musicas = await Musica.find({ idAlbum: album._id })

    // Juntando os dados
    let aux = {
      ...album._doc,
      totalMusicas: musicas.length
    }

    // Adicionando os dados criado no vector
    albuns.push(aux)
  })

  res.render('albuns', { albuns })
}

async function PegarIdArtista(req) {

  // Dados vindo do formulário
  const { artista } = req.body

  // Pegando todos os artistas da base de dados
  let todosArtistas = await Artistas()
  // ids dos artistas
  let idArtista;

  // Adicionando os _ids dos artistas no array
  todosArtistas.map((art) => {
    if (art.nome == artista) {
      idArtista = art._id
    }
  })

  return idArtista
}

async function create(req, res) {

  const { titulo, descricao, totalMusicas, ano } = req.body

  // Pegando o ID do proprietário do Album
  let idArtista = await PegarIdArtista(req)

  // Criando a URL Amigável do nome do Nome do Artista
  var slug = slugFormatter(titulo)

  await Album.findOne({ slug })
    .then(async tem => {
      if (tem) {
        req.flash('error_log', 'Já existe um album com esse nome')
        res.redirect('adicionar-album')
      } else {

        // Criando o artista
        await Album.create({ titulo, slug, descricao, totalMusicas, ano, idArtista })

        // Redirecionando
        req.flash('success_log', 'Album adicionado com sucesso')
        res.redirect('/albuns')
      }
    })
    .catch(err => {
      req.flash('error_log', `Houve o seguinte erro ${err.message}`)
      res.redirect('/adicionar-album')
    })
}

async function update(req, res) {
  // Pegando o slug vindo por parâmetro
  let { slug } = req.params

  // Recebendo os dados do formulário
  let dados = { ...req.body }

  // Criando a url amigável
  dados.slug = slugFormatter(dados.titulo)

  // Trocando o nome dos artista pelo ID dele
  dados.idArtista = await PegarIdArtista(req)

  // Atualizando os dados
  await Album.findOneAndUpdate({slug}, dados)

  // Mensagem de sucesso
  req.flash('success_log', 'Album atualizado com sucesso')

  // Redirecionando o utilizador
  res.redirect('/admin/albuns')
}

async function detalhe(req, res) {

  // Dados do parâmetro
  const { slug } = req.params

  // Procurando o album com o mesmo slug
  const album = await Album.findOne({ slug })
    .populate('idArtista', 'nome slug')

  // Buscando as músicas pertencente ao album
  const musicas = await Musica.find({idAlbum: album._id})

  // Mostrando o album
  res.render('album/album', { album, musicas })
}

async function Artistas() {
  return artistas = await Artista.find()
}

async function adicionar(req, res) {
  const artistas = await Artista.find()

  res.render('admin/album/adicionar', { artistas })
}

async function editar(req, res) {

  // Dados vindo por parâmetro
  let { slug } = req.params

  // Buscando dados das tabelas
  const artistas = await Artista.find({}, 'nome')
  const album = await Album.findOne({ slug })

  // Buscando o proprietário do album
  const artista = await Artista.findById(album.idArtista, 'nome')

  res.render('admin/album/editar', { album, artistas, artista })
}

module.exports = { index, detalhe, create, update, adicionar, editar }