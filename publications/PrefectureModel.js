module.exports = (database, sequelize, RegionModel) => {
  const { DataTypes, Model } = sequelize
  class Prefecture extends Model {}

  Prefecture.init({
    name: DataTypes.STRING,
    regionId: DataTypes.INTEGER,
  }, {
    sequelize: database,
    modelName: "prefecture"
  })

  RegionModel.hasMany(Prefecture, {
    foreignKey: 'regionId'
  })
  Prefecture.belongsTo(RegionModel)

  return Prefecture;
}


  //  create table guide.prefectures(
  //   id int not null auto_increment primary key,
  //   regionId int not null,
  //   name varchar(25),
  //   createdAt date,
  //   updatedAt date,
  //   FOREIGN KEY(regionId) REFERENCES regions(id)
  //  );
