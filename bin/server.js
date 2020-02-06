const app = require('../App')

function normalizePort(val) {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    return val
  }

  if (port >= 0) {
    return port
  }

  return false
}

const PORT = normalizePort(process.env.PORT || '8082')

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))