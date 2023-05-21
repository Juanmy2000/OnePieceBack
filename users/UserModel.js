module.exports = (database, sequelize) => {
  const { DataTypes, Model } = sequelize
  class User extends Model {}

  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    lastName: DataTypes.STRING,
    avatar: DataTypes.TINYINT,
    email: DataTypes.STRING,
    userType: DataTypes.STRING,
    biography: DataTypes.STRING
  }, {
    sequelize: database,
    modelName: "user"
  })

  return User
}
