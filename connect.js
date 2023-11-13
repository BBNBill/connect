const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('db_node_react', 'postgres', 'Aa1250@b!ll', {
    host: 'localhost',
    dialect: 'postgres',/* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
    logging: false
});

module.exports = sequelize;