const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeDB'); 
const Chatbot = require('./chatbot'); 


const User = sequelize.define('User', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
    },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

});


  User.prototype.addChatbot = function(chatbot) {
    return this.setChatbots(chatbot);
  };

 User.hasMany(Chatbot, { foreignKey:'userId', onDelete: 'CASCADE' });

  module.exports = User;