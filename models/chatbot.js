const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeDB'); 
const User = require('./user'); 
const Conversation = require('./conversations');

const Chatbot = sequelize.define('Chatbot', {
  chatbotId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
    },
    chatbot_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  type:{
    type: DataTypes.STRING,
    allowNull: false,
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: true,
    }
});


Chatbot.createChatbot = async (chatbotData) => {
    try {
      const newChatbot = await Chatbot.create(chatbotData);
      return newChatbot;
    } catch (error) {
      throw new Error('Error creating chatbot: ' + error.message);
    }
  }

  Chatbot.prototype.addConversation = function(conversation) {
    return this.setConversation(conversation);
  };

Chatbot.hasMany(Conversation, { foreignKey:'chatbotId', onDelete: 'CASCADE' });

  Chatbot.associate = (models) => {
    Chatbot.belongsTo(models.User, {
        foreignKey: "userId"
    });
}

  module.exports = Chatbot;