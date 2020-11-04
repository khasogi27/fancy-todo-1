const { Todo } = require('../models')

class TodosController {
  static postTodos(req, res) {
    const UserId = req.loggedInUser.id
    const { title, description, status, due_date } = req.body
    Todo.create({
      title, description, status, due_date, UserId
    })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        res.status(500)
      })
  }
  static getTodos(req, res) {
    const UserId = req.loggedInUser.id
    Todo.findAll({
      where: {
        UserId
      }
    })
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
        res.status(500)
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
        res.status(500)
      })
  }
  static patchTodos(req, res) {
    const { status } = req.body
    Todo.update({
      status
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
        res.status(500)
      })
  }
  static deleteTodos(req, res) {
    const { id } = req.params
    Todo.destroy({
      where: {
        id
      }
    })
      .then(data => {
        res.status(200).json({
          message: 'Todos success to delete'
        })
      })
      .catch(err => {
        res.status(500)
      })
  }
}

module.exports = TodosController
