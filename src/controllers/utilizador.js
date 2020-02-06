const bcrypt = require('bcryptjs')
const Utilizador = require('../models/utilizador')
const Username = require('../helpers/username')

async function create(req, res) {

  const dados = { ...req.body, username: '' }

  dados.username = Username(dados.nome + ' ' + dados.apelido)

  await bcrypt.genSalt(10, async (error, salt) => {
    await bcrypt.hash(dados.senha, salt, async (error, hash) => {
      if (error) {
        req.flash('error_log', error)
        return
      }

      dados.senha = hash

      await Utilizador.create(dados)

      req.flash('success_log', 'Utilizador criado com sucesso')
    })
  })

  res.redirect('/')
}

async function detalhe(req, res) {

  const { username } = req.params

  await Utilizador.findOne({ username })
    .then(async utilizador => {
      if (!utilizador) {
        req.flash('error_log', 'Não foi encontrada nenhuma página')
        res.redirect('/')
        return
      }

      res.render('perfil', { utilizador })
    })
}

module.exports = { detalhe, create }