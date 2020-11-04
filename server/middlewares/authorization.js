const { Todo } = require('../models')

class Authorization {
  static authorization(req, res, next) {
    const { id } = req.params
    Todo.findAll(id)
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

module.exports = Authorization