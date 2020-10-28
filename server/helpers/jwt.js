const jwt = require('jsonwebtoken')

const signToken = (obj) => {
  const token = jwt.sign(obj, process.env.SECRET)

  return token
}

const verifyToken = (token) => {
  const decoded = jwt.verify(token, process.env.SECRET)

  return decoded
}

module.exports = {
  signToken,
  verifyToken
}
