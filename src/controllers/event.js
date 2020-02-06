// Importando os models
const Event = require('../models/event')
const Log = require('../models/log')


async function create(descricao, req) {

  let { _id } = req.user

  await Event.create({ idUtilizador: _id, descricao })
}

module.exports = { create }