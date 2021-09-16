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
          res.status(201).json(atendimento)
        }
      })
    }
  }

  lista(res) {
    const sql = 'SELECT * FROM Atendimentos'

    conexao.query(sql, (err, results) => {
      if (err) {
        res.status(400).json(err)
      } else {
        res.status(200).json(results)
      }
    })
  }

  buscaPorId(id, res) {
    const sql = `SELECT * FROM Atendimentos WHERE id=${id}`

    conexao.query(sql, (err, results) => {
      const atendimento = results[0]
      if(err){
        res.status(400).json(err)
      } else {
        res.status(200).json(atendimento)
      }
    })
  }

  altera(id, values, res) {
    if(values.data) {
      values.data = moment(values.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
    }
    const sql = 'UPDATE Atendimentos SET ? WHERE id=?'

    conexao.query(sql, [values, id], (err, results) => {
      if(err) {
        res.status(400).json(err)
      } else {
        res.status(200).json({...values, id})
      }
    })
  }

  apaga(id, res) {
    const sql = `DELETE FROM Atendimentos WHERE id=?`

    conexao.query(sql, id, (err, results) => {
      if(err) {
        res.status(400).json(err)
      } else {
        res.status(200).json({id, Message: "Atendimento apagado com sucesso!"})
      }
    })
  }
}

module.exports = new Atendimento