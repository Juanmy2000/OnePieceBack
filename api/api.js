const express = require('express')
const sequelize = require('sequelize')

const config = require('./config')
const crossDomain = require('./middlewares/crossDomain')
const checkToken = require('./middlewares/checkToken')
const errorHandler = require('./middlewares/errorHandler')
// const CharModel = require('../publications/PersonajeModel')

const { Sequelize } = sequelize
const database = new Sequelize(
  config.database.db,
  config.database.username,
  config.database.password,
  {
    host: config.database.host,
    port: config.database.port,
    dialect: 'mysql',
  }
)


// USER
const UserModel = require('./../users/UserModel')(database, sequelize)

// POSTS
const PublicationModel = require('./../publications/PublicationModel')(database, sequelize, UserModel)
const CommentModel = require('../publications/CommentModel')(database, sequelize, PublicationModel, UserModel)
const RegionModel = require('../publications/RegionModel')(database, sequelize)
const PrefectureModel = require('../publications/PrefectureModel')(database, sequelize, RegionModel)
const UserPublicationModel = require('../publications/UserPublicationsModel')(database, sequelize, UserModel, PublicationModel)
const CharactersModel = require('../publications/CharactersModel')(database, sequelize)
const PersonajeModel = require('../publications/PersonajeModel')(database, sequelize)

const Publication = require('../publications/Publication')(PublicationModel, PersonajeModel, CommentModel, RegionModel, PrefectureModel, UserModel, UserPublicationModel, CharactersModel)
const publicationsRoutes = require('./routes/publication.routes')(express, checkToken, Publication)

// const Wiki = require('../publications/Wiki')(CharactersModel)
// const wikiRoutes = require('./routes/wiki.routes')(express, checkToken, Wiki)

// AUTH
const Auth = require('./../auth/Auth')(UserModel, config, UserPublicationModel, PublicationModel)
const authRoutes = require('./routes/auth.routes')(express, config, checkToken, Auth)
const User = require('./../users/User')(UserModel, UserPublicationModel, PublicationModel)
const userRoutes = require('./routes/user.routes')(express, checkToken, User)


const app = express()
app.enable('trust proxy')

app.use(express.json())

app.use(crossDomain)
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/publications', publicationsRoutes)
// app.use('/api/wiki', wikiRoutes)

app.use(errorHandler)

app.listen(config.port)
console.log('API running in ', config.port)