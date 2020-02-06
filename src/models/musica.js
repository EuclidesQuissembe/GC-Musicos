// Importando módulos
const mongoose = require('mongoose')

let raiz = ''

const Musica = mongoose.Schema({
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
  letra: {
    type: String,
    trim: true
  },
  duracao: {
    type: String,
    required: true,
    trim: true
  },
  ano: {
    type: String,
    required: true,
    trim: true
  },
  genero: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genero',
    required: true
  },
  idArtistas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artista',
    required: true
  }],
  idAlbum: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album',
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('Musica', Musica)
