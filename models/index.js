const dbConfig = require('../config')().db;

const sequelize = require('sequelize');
const Sequelize = new sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./users/user.model')(Sequelize, sequelize);
db.products = require('./common/products/product.model')(Sequelize, sequelize);

db.Sequelize.sync();
module.exports = db;