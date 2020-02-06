// Importando módulos
const mongoose = require('mongoose')

const Genero = mongoose.Schema({
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
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('Genero', Genero)