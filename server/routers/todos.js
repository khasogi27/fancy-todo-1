const routes = require('express').Router()
const TodosController = require('../controllers/todosController')

routes.post('/', TodosController.postTodos)
routes.get('/', TodosController.getTodos)
routes.get('/:id', TodosController.getTodosById)
routes.put('/:id', TodosController.putTodos)
routes.patch('/:id', TodosController.patchTodos)
routes.delete('/:id', TodosController.deleteTodos)

module.exports = routes
