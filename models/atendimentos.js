const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

class Atendimento {
  adiciona(atendimento, res) {
    const dataCriacao = new moment().format('YYYY-MM-DD HH:MM:SS')
    const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
    const atendimentoDatado = {...atendimento, dataCriacao, data}
    const sql = 'INSERT INTO Atendimentos SET ?'

    conexao.query(sql, atendimentoDatado, (err, results) => {
      if (err) {
        res.status(400).json(err)
      } else {
        res.status(201).json(results)
      }
    })
  }
}

module.exports = new Atendimento