module.exports = (database, sequelize) => {
    const { DataTypes, Model } = sequelize
    class Publication extends Model{}

    Publication.init({
        name: DataTypes.STRING
    },{
        sequelize: database,
        modelName: "character"
    })

    return Publication;

}