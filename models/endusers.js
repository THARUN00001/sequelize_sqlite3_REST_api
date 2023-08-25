const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeDB'); 


const EndUser = sequelize.define('EndUser', {
  endUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
    },
  endUser_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },endUser_gender:{
    type: DataTypes.STRING,
    allowNull: false,
    },
    endUser_mail:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    endUser_phone:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    endUser_city:{
        type: DataTypes.STRING,
        allowNull: false,
    }
  });



  module.exports = EndUser;