// Importando módulos
const Artista = require('../models/artista')
const Album = require('../models/album')
const Musica = require('../models/musica')

// Importando Funções
const slugFormatter = require('../helpers/slug-formatter')

async function index(req, res) {
  const artistas = await Artista.find()

  res.render('artistas', { artistas })
}

async function create(req, res) {

  const { nome, descricao } = req.body

  // Criando a URL Amigável do nome do Nome do Artista
  var slug = slugFormatter(nome)

  await Artista.findOne({ slug })
    .then(async tem => {
      if (tem) {
        req.flash('error_log', 'Já existe um artista com esse nome')
        res.redirect('adicionar-artista')
      } else {
        // Criando o artista
        await Artista.create({ nome, slug, descricao })

        // Redirecionando
        req.flash('success_log', 'Artista adicionado com sucesso')
        res.redirect('/artistas')
      }
    })
    .catch(err => {
      req.flash('error_log', `Houve o seguinte erro ${err.message}`)
      res.redirect('/adicionar-artista')
    })
}

async function detalhe(req, res) {

  // Dados da url
  const { slug } = req.params

  // Procurando o artista com o slug igual
  const artista = await Artista.findOne({ slug })

  // Procurando as músicas do artista encontrado
  const musicas = await Musica.find({ idArtistas: artista._id }).populate('genero')

  // Procurando os albuns do artista encontrado
  const response = await Album.find({ idArtista: artista._id })

  // Array vazio
  let albuns = []

  // Percorrendo cada album
  await response.map(async album => {
    const musicas = await Musica.find({ idAlbum: album._id })

    let aux = {
      ...album._doc,
      totalMusicas: musicas.length
    }

    albuns.push(aux)
  })

  // Mostrando o artista
  res.render('artista/artista', { artista, albuns, musicas })
}

async function update(req, res) {

  // Pegando o slug dos parâmetros
  const { slug } = req.params

  // Procurando pelo artista
  await Artista.findOne({ slug })
    .then(async () => {

      let dados = {
        ...req.body,
        slug
      }

      // Formatando o novo nome
      dados.slug = slugFormatter(dados.nome)

      // Atualizando os dados
      await Artista.findOneAndUpdate({ slug }, dados)
      req.flash('success_log', 'Artista atualizado com sucesso')
    })
    .catch(err => {
      req.flash('error_log', 'Houve o seguinte erro ' + err.message)
    })

  res.redirect('/admin/artistas')
}

async function editar(req, res) {

  let { slug } = req.params

  const artista = await Artista.findOne({ slug })

    .then(async artista => {

      if (!artista) {
        req.flash('error_log', 'Não existe nenhum artista com esse nome')
        res.redirect('/artistas')
        return;
      }

      res.render('admin/artista/editar', { artista })
    })

}

function adicionar(req, res) {
  res.render('admin/artista/adicionar')
}

module.exports = {
  index,
  detalhe,
  create,
  update,
  editar,
  adicionar
}