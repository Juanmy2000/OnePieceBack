module.exports = (database, sequelize, UserModel, PublicationModel) => {
  const { DataTypes, Model } = sequelize
  class UserPublication extends Model {}

  UserPublication.init({
    publicationId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    region: DataTypes.STRING,
    prefecture: DataTypes.STRING
  }, {
    sequelize: database,
    modelName: "userPublication"
  })

  UserModel.hasMany(UserPublication, {
    foreignKey: 'userId'
  })
  UserPublication.belongsTo(UserModel)

  PublicationModel.hasMany(UserPublication, {
    foreignKey: 'publicationId'
  })
  UserPublication.belongsTo(PublicationModel)


  return UserPublication;
}

  // create table guide.userPublications(
  //   id int not null auto_increment primary key,
  //   publicationId int not null,
  //   region varchar(25),
  //   prefecture varchar(25),
  //   userId int not null,
  //   createdAt date,
  //   updatedAt date
  //  );
