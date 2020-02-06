// Importando módulos
const bcrypt = require('bcryptjs')
const localStrategy = require('passport-local').Strategy
const Utilizador = require('../models/utilizador')

// Models
const Log = require('../models/log')

// Função para verificar a senha
async function VerificarSenha({ senha, utilizador }, done) {

  await bcrypt.compare(senha, utilizador.senha, async (error, iguais) => {
    if (error) {
      return done(null, false, { message: error })
    }

    if (iguais) {
      await Log.create({ idUtilizador: utilizador._id })

      return done(null, utilizador)
    } else {
      return done(null, false, { message: 'senha errada' })
    }
  })
}

module.exports = function (passport) {
  passport.use(new localStrategy({ usernameField: 'emailUser', passwordField: 'senha' }, (emailUser, senha, done) => {

    Utilizador.findOne({ email: emailUser })
      .then(async utilizador => {
        if (!utilizador) {
          Utilizador.findOne({ username: emailUser })
            .then(async user => {
              if (!user) {
                return done(null, false, { message: 'Esta conta não existe' })
              }
              // Verificando a Senha
              await VerificarSenha({ senha, utilizador: user }, done)
            })
        } else {
          // Verificando a Senha
          await VerificarSenha({ senha, utilizador }, done)
        }
      })
  }))

  passport.serializeUser((utilizador, done) => {
    done(null, utilizador.id)
  })

  passport.deserializeUser((id, done) => {
    Utilizador.findById(id, (err, utilizador) => {
      done(err, utilizador)
    })
  })
}