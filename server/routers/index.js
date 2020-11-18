const routes = require('express').Router()
const Todos = require('./todos')
const User = require('./user')

routes.use('/', User)
routes.use('/todos', Todos)

module.exports = routes
