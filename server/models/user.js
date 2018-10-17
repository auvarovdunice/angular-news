'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {});

    User.associate = function (models) {
        User.hasOne(models.Personal, {
            foreignKey: 'owner',
            as: "personal"
        });
        User.hasMany(models.Post, {
            foreignKey: 'owner',
            as: "posts"
        });
    };
    return User;
};