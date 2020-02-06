const mongoose = require('mongoose')

const Log = mongoose.Schema({
  idUtilizador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Utilizador',
    required: true
  },
  entrou: {
    type: Date,
    default: Date.now()
  },
  saiu: {
    type: Date,
    default: Date.now()
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('Log', Log)