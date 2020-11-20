const { Todo } = require('../models')

class TodosController {

  static postTodos(req, res, next) {
    const UserId = req.loggedInUser.id
    const { title, description, status, due_date } = req.body
    Todo.create({
      title, description, status, due_date, UserId
    })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static getTodos(req, res, next) {
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
        next(err)
      })
  }

  static getTodosById(req, res, next) {
    const { id } = req.params
    Todo.findByPk(id)
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static putTodos(req, res, next) {
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
        next(err)
      })
  }

  static patchTodos(req, res, next) {
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
        next(err)
      })
  }

  static deleteTodos(req, res, next) {
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
        next(err)
      })
  }

}

module.exports = TodosController
