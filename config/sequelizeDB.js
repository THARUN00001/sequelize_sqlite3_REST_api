const { Sequelize, DataTypes } = require('sequelize');

const sequelizeDB = new Sequelize('sequelize_api', 'root', 'password', {
    host: 'localhost',
    dialect: 'sqlite', 
    storage: 'sequelize_REST-API_DB.sqlite'
});

  try {
    sequelizeDB.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

module.exports = sequelizeDB;