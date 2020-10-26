const routes = require('express').Router()
const Controller = require('../controllers/controller')

routes.post('/todos', Controller.postTodos)
routes.get('/todos', Controller.getTodos)
routes.get('/todos/:id', Controller.getTodosById)
routes.put('/todos/:id', Controller.putTodos)
routes.patch('/todos/:id', Controller.patchTodos)
routes.delete('/todos/:id', Controller.deleteTodos)

module.exports = routes
