const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

class Atendimento {
  adiciona(atendimento, res) {
    const dataCriacao = new moment().format('YYYY-MM-DD HH:MM:SS')
    const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
    
    const dataValida = moment(data).isSameOrAfter(dataCriacao)
    const clienteValido = atendimento.cliente.length >= 5

    const validacoes = [
      {
        nome: 'data',
        valido: dataValida,
        mensagem: 'Data deve ser maior ou igual a data atual',
      },
      {
        nome: 'cliente',
        valido: clienteValido,
        mensagem: 'Cliente deve ter um nome maior que 5 caracteres',
      }
    ]

    const erros = validacoes.filter(campo => !campo.valido)
    const existemErros = erros.length

    if (existemErros) {
      res.status(400).json(erros)
    } else {
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

  lista(result) {
    const sql = 'SELECT * FROM Atendimentos'

    conexao.query(sql, (err, res) => {
      if (err) {
        result.status(400).json(err)
      } else {
        result.status(200).json(res)
      }
    })
  }
}

module.exports = new Atendimento