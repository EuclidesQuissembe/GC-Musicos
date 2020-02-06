const mongoose = require('mongoose')

// Sincronizando as promises
mongoose.Promise = global.Promise

// Criando a conexão com o banco de dados
mongoose.connect('mongodb://localhost/github-musicos', {
  useCreateIndex: true,
  useFindAndModify: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Banco de Dados criado com sucesso!'))
  .catch(err => console.log('Houve o seguinte erro ' + err))