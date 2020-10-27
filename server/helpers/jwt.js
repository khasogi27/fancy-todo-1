const jwt = require('jsonwebtoken')

const signToken = (obj) => {
  const token = jwt.sign(obj, process.env.SECRET)

  return token
}

module.exports = {
  signToken
}
