const Atendimento = require('../models/atendimentos')

module.exports = app => {
  app.get('/atendimentos', (req, res) => {
    Atendimento.lista(res)
  })

  app.get('/atendimentos/:id', (req, res) => {
    console.log(req.params)

    res.send("OK")
  })

  app.post('/atendimentos', (req, res) => {
    const atendimento = req.body
    
    Atendimento.adiciona(atendimento, res)
  })
}