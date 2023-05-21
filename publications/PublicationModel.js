module.exports = (database, sequelize, UserModel) => {
    const { DataTypes, Model } = sequelize
    class Publication extends Model {}
  
    Publication.init({
      title: DataTypes.STRING,
      body: DataTypes.STRING,
      summary: DataTypes.STRING,
      regionId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      prefectureId: DataTypes.INTEGER
    }, {
      sequelize: database,
      modelName: "publication"
    })

    UserModel.hasMany(Publication, {
      foreignKey: 'userId'
    })
    Publication.belongsTo(UserModel)
  
    return Publication;
  }
  
  // create table guide.publications (
  //   title varchar(150),
  //     body longtext,
  //     summary longtext,
  //     regionId int not null,
  //     prefectureId int not null,
  //     userId int,
  //     id int not null auto_increment primary key,
  //     createdAt date,
  //     updatedAt date,
  //     FOREIGN KEY(prefectureId) REFERENCES prefectures(id),
  //     FOREIGN KEY(regionId) REFERENCES regions(id)
  // );