const mongoose = require('mongoose')

const Event = mongoose.Schema({
  idUtilizador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Utilizador',
    required: true
  },
  // idLog: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Log',
  //   required: true
  // },
  descricao: {
    type: String,
    trim: true,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('Event', Event)