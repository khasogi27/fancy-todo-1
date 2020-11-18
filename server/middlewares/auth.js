const { User, Todo } = require('../models')
const { verifyToken } = require('../helpers/jwt')

class Auth {

  static authentication(req, res, next) {
    const { token } = req.headers
    if (!token) {
      res.status(401).json({
        msg: 'Authentication failed'
      })
    } else {
      const decoded = verifyToken(token)
      User.findOne({
        where: {
          email: decoded.email
        }
      })
        .then(data => {
          if (!data) {
            res.status(401).json({
              msg: 'Authentication failed'
            })
          } else {
            req.loggedInUser = decoded
            next()
          }
        })
        .catch(err => {
          const status = err.status || 500
          const msg = err.msg || 'Internal Server Error'
          res.status(status).json({
            error: msg
          })
        })
    }
  }

  static authorization(req, res, next) {
    const { id } = req.params
    Todo.findByPk(id)
      .then(data => {
        if (!data) {
          res.status(404).json({
            msg: 'Todo not fount'
          })
        } else if (data.UserId === req.loggedInUser.id) {
          next()
        } else {
          res.status(401).json({
            msg: 'Not authorized'
          })
        }
      })
      .catch(err => {
        const status = err.status || 500
        const msg = err.msg || 'Internal Server Error'
        res.status(status).json({
          error: msg
        })
      })
  }

}

module.exports = Auth
