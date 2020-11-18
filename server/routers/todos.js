const routes = require('express').Router()
const TodosController = require('../controllers/todosController')
const Auth = require('../middlewares/auth')

routes.use(Auth.authentication)
routes.post('/', TodosController.postTodos)
routes.get('/', TodosController.getTodos)
routes.get('/:id', Auth.authorization, TodosController.getTodosById)
routes.put('/:id', Auth.authorization, TodosController.putTodos)
routes.patch('/:id', Auth.authorization, TodosController.patchTodos)
routes.delete('/:id', Auth.authorization, TodosController.deleteTodos)

module.exports = routes
