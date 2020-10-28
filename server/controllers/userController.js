const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

class UserController {
  static signup(req, res) {
    const obj = {
      email: req.body.email,
      password: req.body.password
    }
    User.create(obj)
      .then(data => {
        res.status(201).json({
          id: data.id,
          email: data.email
        })
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
  static signin(req, res) {
    const obj = {
      email: req.body.email,
      password: req.body.password
    }
    User.findOne({
      where: {
        email: obj.email
      }
    })
      .then(data => {
        if (!data) {
          res.status(401).json({
            message: 'Email/password salah'
          })
        } else if (!comparePassword(obj.password, data.password)) {
          res.status(401).json({
            message: 'Email/password salah'
          })
        } else {
          const access_token = signToken({
            id: data.id,
            email: data.email
          })
          res.status(200).json({
            access_token
          })
        }
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
}

module.exports = UserController
