'use strict'

module.exports = (Sequelize, DataTypes) => {
    const Users = Sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER(255),
            autoIncrement: true,
            unique: true,
            allowNull: false,
            primaryKey: true
        },
        userName: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            required: true,
            unique: {
                args: true,
                msg: {
                    "errorCode": "USER_EXSIST",
                    "message": "Email address already in use!"
                }
            },
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false,
        }
    }, {
        underscored: false,
        createdAt: "createdAt",
        updatedAt: "updatedAt",
        deletedAt: "deletedAt",
        paranoid: true,
        timestamps: true
    });
    return Users;
};