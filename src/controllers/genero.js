// Importando módulos
const Genero = require('../models/genero')

// Importando Funções
const slugFormatter = require('../helpers/slug-formatter')

async function index(req, res) {
  const generos = await Genero.find()

  res.render('admin/generos', { generos })
}

async function create(req, res) {

  const { nome } = req.body

  // Criando a URL Amigável do nome do Nome do Artista
  var slug = slugFormatter(nome)

  await Genero.findOne({ slug })
    .then(async tem => {
      if (tem) {
        req.flash('error_log', 'Esse gênero já existe')
        res.redirect('/admin/genero/adicionar')
      } else {
        // Criando o artista
        await Genero.create({ nome, slug })

        // Redirecionando
        req.flash('success_log', 'Gênero adicionado com sucesso')
        res.redirect('/admin/generos')
      }
    })
    .catch(err => {
      req.flash('error_log', `Houve o seguinte erro ${err.message}`)
      res.redirect('/admin/genero/adicionar')
    })
}

module.exports = { index, create }