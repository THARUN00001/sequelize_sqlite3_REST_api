const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeDB'); 
const Chatbot = require('./chatbot');

const Conversation = sequelize.define('Conversation', {
  conversationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
    },
    conversation_title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  status:{
    type: DataTypes.STRING,
    allowNull: false,
    },
    chatbotId:{
        type: DataTypes.INTEGER,
        allowNull: true,
    }
});

  Conversation.associate = (models) => {
    Conversation.belongsTo(models.Chatbot, {
        foreignKey: "chatbotId"
    });
}

  module.exports = Conversation;