const Sequelize = require('sequelize');
const config = require("../utils/config")

const sequelize = new Sequelize(config.DB_SCHEMA || 'postgres',
                                config.DB_USER || 'postgres',
                                config.DB_PASSWORD || 'password',
                                {
                                    host: config.DB_HOST || 'localhost',
                                    port: config.DB_PORT || 5432,
                                    dialect: 'postgres',
                                    dialectOptions: {
                                        ssl: process.env.DB_SSL == "true"
                                    }
                                });
const Users = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    passwordHash: {
        type: Sequelize.STRING,
        allowNull: false
    },
});
module.exports = {
   sequelize,
   Users
};