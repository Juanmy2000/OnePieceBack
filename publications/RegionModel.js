module.exports = (database, sequelize) => {
  const { DataTypes, Model } = sequelize
  class Region extends Model {}

  Region.init({
    name: DataTypes.STRING,
  }, {
    sequelize: database,
    modelName: "region"
  })


  return Region;
}

  // create table guide.regions(
  //   id int not null auto_increment primary key,
  //   name varchar(25),
  //   createdAt date,
  //   updatedAt date
  //  );
