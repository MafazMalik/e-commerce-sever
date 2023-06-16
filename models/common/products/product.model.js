'use strict'

module.exports = (Sequelize, DataTypes) => {
    const Products = Sequelize.define('products', {
        id: {
            type: DataTypes.INTEGER(255),
            autoIncrement: true,
            unique: true,
            allowNull: false,
            primaryKey: true
        },
        productName: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false
        },
        slug: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false
        },
        mrp: {
            type: DataTypes.INTEGER(20),
            required: true,
            allowNull: false
        },
        discount: {
            type: DataTypes.INTEGER(20),
            required: true,
            allowNull: false
        },
        categoryId: {
            type: DataTypes.INTEGER(255),
            required: true,
            allowNull: false
        },
        subCategoryId: {
            type: DataTypes.INTEGER(20),
            required: true,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false
        },
        shortNotes: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false
        },
        imageUrl: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false
        },
    }, {
        underscored: false,
        createdAt: "createdAt",
        updatedAt: "updatedAt",
        deletedAt: "deletedAt",
        paranoid: true,
        timestamps: true
    });
    return Products;
};