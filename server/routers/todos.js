const routes = require('express').Router()
const TodosController = require('../controllers/todosController')
const Authentication = require('../middlewares/authentication')
const Authorization = require('../middlewares/authorization')

routes.use(Authentication.authentication)
routes.post('/', TodosController.postTodos)
routes.get('/', TodosController.getTodos)
routes.get('/:id', TodosController.getTodosById)
routes.put('/:id', TodosController.putTodos)
routes.patch('/:id', TodosController.patchTodos)
routes.delete('/:id', Authorization.authorization, TodosController.deleteTodos)

module.exports = routes
