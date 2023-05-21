module.exports = (req, res, next) => {
  const jwt = require('jsonwebtoken')
  const config = require('./../config')
  const token = req.headers['authorization'] || req.body?.token || req.query?.token
  if (!token) {
    const error = new Error('No has proporcionado token de sesión')
    error.status = 401
    error.success =false
    next(error)
  }
  jwt.verify(token, config.secretKey, (err, decoded) => {
    if (err) {
      err.status = 401
      err.success = false
      next(err)
    } else {
      req.user = decoded
      next()
    }
  })
}