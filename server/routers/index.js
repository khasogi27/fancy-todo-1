const routes = require('express').Router()
const Todos = require('./todos')

routes.use('/todos', Todos)

module.exports = routes
