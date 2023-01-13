module.exports = (sequelize, DataTypes) => {
  const Groups = sequelize.define("Groups", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  Groups.associate = (models) => {
    Groups.belongsToMany(models.Users, {
      onDelete: "cascade",
      through: models.UsersGroups
    });
  };
  return Groups;
};
