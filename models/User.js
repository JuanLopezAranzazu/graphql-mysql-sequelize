module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Users.associate = (models) => {
    Users.belongsTo(models.Roles, {
      onDelete: "cascade",
    });

    Users.belongsToMany(models.Groups, {
      onDelete: "cascade",
      through: models.UsersGroups,
    });
  };

  return Users;
};
