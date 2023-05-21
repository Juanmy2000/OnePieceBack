const encrypter = require('./encryptString')
const jwt = require('jsonwebtoken')
module.exports = (UserModel, config, UserPublicationModel, PublicationModel) => {
  class Auth {
    /**
     * Creates new JWT from user already validated
     * @param {{username: string, password: string}} user 
     */
    async getToken(user) {
      try {
        if (!user || !user.username || !user.password) {
          throw new Error('El nombre de usuario y la contraseña son obligatorios')
        }
        const encryptedPassword = await encrypter(user.password)
        const dbUser = await UserModel.findOne({
          where: { username: user.username, password: encryptedPassword },
          attributes: {
            exclude: ['password']
          },
          include: {
            model: UserPublicationModel,
            include: {
              model: PublicationModel,
              attributes: {
                exclude: ['body']
              }
            }
          }
        })
        if (dbUser) { // validated
          const token = jwt.sign(dbUser.toJSON(), config.secretKey, { expiresIn: config.tokenExpireSeconds })
          return { token, dbUser }
        } else { // not validated
          throw new Error('Usuario o contraseña inválidos')
        }
      } catch (e) {
        throw e
      }
    }
  }

  return new Auth()
}