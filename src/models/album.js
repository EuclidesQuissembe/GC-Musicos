// Importando módulos
const mongoose = require('mongoose')

let raiz = ''

const Album = mongoose.Schema({
  imagem: {
    type: String,
    trim: true,
    default: raiz + 'artista/profile.jpeg'
  },
  titulo: {
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
  ano: {
    type: String,
    required: true,
    trim: true
  },
  idArtista: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artista',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('Album', Album)
