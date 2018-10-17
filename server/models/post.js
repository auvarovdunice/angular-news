'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    owner: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
  }, {});
  Post.associate = function(models) {
    // associations can be defined here

      Post.belongsTo(models.User, {
          foreignKey: 'owner',
      });
  };
  return Post;
};