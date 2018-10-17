'use strict';
module.exports = (sequelize, DataTypes) => {
  const Personal = sequelize.define('Personal', {
    avatar: {
        type: DataTypes.STRING,
        defaultValue: "uploads/default-avatar.png",
    }
  }, {});
  Personal.associate = function(models) {
      Personal.belongsTo(models.User, {
          foreignKey: 'owner',
      });
  };
  return Personal;
};