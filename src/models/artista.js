// Importando módulos
const mongoose = require('mongoose')

let raiz = ''

const Artista = mongoose.Schema({
  imagem: {
    type: String,
    trim: true,
    default: raiz + 'artista/profile.jpeg'
  },
  nome: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    trim: true
  },
  descricao: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('Artista', Artista)