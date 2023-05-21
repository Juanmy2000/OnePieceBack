module.exports = (database, sequelize) => {
    const { DataTypes, Model } = sequelize
    class Personaje extends Model{}

    Personaje.init({
        birthday: DataTypes.STRING,
        city: DataTypes.STRING,
        age: DataTypes.STRING,
        height: DataTypes.STRING,
        gs: DataTypes.STRING,
        fruit: DataTypes.STRING,
        type: DataTypes.STRING,
        status: DataTypes.STRING,
        bounty: DataTypes.STRING,
        haki: DataTypes.STRING,
        meal: DataTypes.STRING,
        other: DataTypes.STRING,

    },{
        sequelize: database,
        modelName: "infochar"
    })

    return Personaje;

}