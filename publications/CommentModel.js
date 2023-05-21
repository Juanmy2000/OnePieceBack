module.exports = (database, sequelize, PublicationModel, UserModel) => {
  const { DataTypes, Model } = sequelize
  class Comment extends Model {}

  Comment.init({
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    publicationId: DataTypes.INTEGER,
  }, {
    sequelize: database,
    modelName: "comment"
  })

  PublicationModel.hasMany(Comment, {
    foreignKey: 'publicationId'
  })
  Comment.belongsTo(PublicationModel)

  UserModel.hasMany(Comment, {
    foreignKey: 'userId'
  })
  Comment.belongsTo(UserModel)

  return Comment;
}


// create table guide.comments (
//    id int not null auto_increment primary key,
//    title varchar(255),
//    body longtext,
//    publicationId int not null,
//    userId int not null,
//    createdAt date,
//    updatedAt date,
//    FOREIGN KEY(publicationId) REFERENCES publications(id)
// );
