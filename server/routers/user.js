const routes = require('express').Router()
const UserController = require('../controllers/userController')

routes.post('/signup', UserController.signup)
routes.post('/signin', UserController.signin)
routes.post('/googlelogin', UserController.googleLogin)

module.exports = routes
