const atendimentos = require('../models/atendimentos')
const Atendimento = require('../models/atendimentos')

module.exports = app => {
  app.get('/atendimentos', (req, res) => {
    Atendimento.lista(res)
  })

  app.get('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id)

    Atendimento.buscaPorId(id, res)
  })

  app.post('/atendimentos', (req, res) => {
    const atendimento = req.body
    
    Atendimento.adiciona(atendimento, res)
  })

  app.patch('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const values = req.body

    Atendimento.altera(id, values, res)
  })

  app.delete('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    
    Atendimento.apaga(id, res)
  })
}