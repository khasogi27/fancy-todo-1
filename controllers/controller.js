const { Todo } = require('../models')

class Controller {
  
  static postTodos(req, res) {
    const { title, description, status, due_date } = req.body
    Todo.create({
      title, description, status, due_date
    }, {
      where : {
        id: req.params.id
      }
    })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        res.status(400)
      })
  } 

  static getTodos(req, res) {
    Todo.findAll()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500)
      })
  }

  static getTodosById(req, res) {
    const { id } = req.params
    Todo.findByPk(id)
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.statuc(404)
      })
  } 

  static putTodos(req, res) {
    const { title, description, status, due_date } = req.body
    Todo.update({
      title, description, status, due_date
    }, {
      where: {
        id: req.params.id
      },
      returning: true
    })
      .then(data => {
        res.status(200).json(data[1][0])
      })
      .catch(err => {
        res.status(400)
      })
  } 

  static patchTodos(req, res) {
    const { title, description, status, due_date } = req.body
    Todo.update({
      title, description, status, due_date
    }, {
      where: {
        id: req.params.id
      },
      returning: true
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(400)
      })
  }

  static deleteTodos(req, res) {
    Todo.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(404)
      })
  }

}

module.exports = Controller
