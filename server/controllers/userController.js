const { OAuth2Client } = require('google-auth-library')
const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

class UserController {

  static signup(req, res, next) {
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
        next(err)
      })
  }

  static signin(req, res, next) {
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
        next(err)
      })
  }

  static googleLogin(req, res, next) {
    //verify token
    //dapetin token dari client
    // let { google_access_token } = req.body
    const client = new OAuth2Client(process.env.CLIENT_ID);
    let email = ""
    //verify google token berdasarkan client id
    client.verifyIdToken({
      idToken: req.headers.google_access_token,
      audience: process.env.CLIENT_ID
    })
      .then(ticket => {
        let payload = ticket.getPayload()
        email = payload.email
        return User.findOne({
          where: { email }
        })
      })
      .then(user => {
        if (!user) {
          let obj = {
            email: email,
            password: "randompassword"
          }
          console.log(obj)
          return User.create(obj)
        } else {
          return user
        }
      })
      .then(dataUser => {
        console.log(dataUser);
        let access_token = signToken({ id: dataUser.id, name: dataUser.name, email: dataUser.email })
        return res.status(200).json({ access_token })
      })
      .catch(err => {
        next(err)
      })
  }

}

module.exports = UserController
