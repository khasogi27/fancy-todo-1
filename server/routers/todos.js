const routes = require('express').Router()
const TodosController = require('../controllers/todosController')
const Authentication = require('../middlewares/authentication')

routes.post('/', Authentication.authentication, TodosController.postTodos)
routes.get('/', Authentication.authentication, TodosController.getTodos)
routes.get('/:id', TodosController.getTodosById)
routes.put('/:id', TodosController.putTodos)
routes.patch('/:id', TodosController.patchTodos)
routes.delete('/:id', TodosController.deleteTodos)

module.exports = routes
