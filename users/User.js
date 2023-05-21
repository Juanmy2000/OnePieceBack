const encrypter = require('../auth/encryptString')
const { Op } = require('sequelize')

module.exports = (UserModel, UserPublicationModel, PublicationModel) => {

  class User {
    async getUsers() {
      console.log('class User get')
      const users = await UserModel.findAll({
        attributes: {
          exclude: ['password']
        }
      })
      return users
    }

    async getUser(user) {
      try {
        const dbUser = await UserModel.findByPk(user.id, { 
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
        if (dbUser) {
          return dbUser
        } else {
          throw new Error('Usuario no encontrado')
        }
      } catch(e) {
        throw e
      }
    } 

    async modify(id, user) {
      try {
        if (!id || !user || !user.username || !user.email) {
          throw new Error('Campos incorrectos')
        }
        const dbUser = await UserModel.findByPk(id)
        if (!dbUser) {
          throw new Error('Usuario no encontrado')
        }
        const avaliable = await this.userNameAvaliable(user.username, id)
        if (!avaliable) {
          throw new Error(`El nombre de usuario ${user.username} ya está en uso`)
        }
        dbUser.username = user.username,
        dbUser.updatedAt = new Date(),
        dbUser.name = user.name || null,
        dbUser.lastName = user.lastName || null,
        dbUser.avatar = user.avatar || 1,
        dbUser.email = user.email
        await dbUser.save()
        return true
      } catch(e) {
        throw e
      }
    }

    async userNameAvaliable(username, id) {
      try {
        const user = await UserModel.findOne({
          where: {
            username,
            id: { [Op.ne]: id }
          }
        })
        if (user) return false
        else return true
      } catch (e) {
        throw e
      }
    }

    async create(user) {
      try {
        if (!user || !user.username || !user.password || !user.email) {
          throw new Error('Campos incorrectos')
        }
        const encriptedPassword = await encrypter(user.password)
        const avaliable = await this.userNameAvaliable(user.username, null)
        if (!avaliable) {
          throw new Error(`El nombre de usuario ${user.username} ya está en uso`)
        }
        await UserModel.create({
          username: user.username,
          password: encriptedPassword,
          createdAt: new Date(),
          updatedAt: null,
          name: user.name || null,
          lastName: user.lastName || null,
          avatar: user.avatar || 1,
          email: user.email,
          userType: 'normal' 
        })
        return true
      } catch (e) {
        throw e
      }
    }
  }

  return new User()

}