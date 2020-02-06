const mongoose = require('mongoose')

const Utilizador = mongoose.Schema({
  eAdmin: {
    type: Number,
    default: 0
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  nome: {
    type: String,
    required: true,
    trim: true
  },
  apelido: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  senha: {
    type: String,
    required: true,
    trim: true
  }
})

module.exports = mongoose.model('Utilizador', Utilizador)