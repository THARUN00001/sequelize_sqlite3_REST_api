const express = require('express');
const bodyParser = require('body-parser');

const sequelizeDB = require('./config/sequelizeDB');
const User = require('./models/user');
const Chatbot = require('./models/chatbot');
const Conversation = require('./models/conversations');
const EndUser = require('./models/endusers');

const app = express();
app.use(bodyParser.json()); 

app.post('/users', async (req, res) => {
    try {
      const userData = req.body;
      
      const newUser = await User.create(userData);
      res.status(201).json(newUser);
     
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });


app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.params.id } });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


app.put('/users/:id', async (req, res) => {
    try {
        const userData = {
            "username": req.body.username,  
        };
         const user = await User.findOne({ where: { userId: req.params.id } }); 
          if (user) {
            await User.update(userData, { where: { userId: req.params.id } });
          }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


app.delete('/users/:id', async (req, res) => {  
    try {
         const user = await User.findOne({ where: { userId: req.params.id } });
      if (user) {
        await User.destroy({ where: { userId: req.params.id } });
      }
        res.status(200).json("user deleted");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});



// chatbot operations from here

app.post('/users/:userId/chatbots', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newChatbot = await Chatbot.create({
      chatbot_name: req.body.chatbot_name,
      userId: req.params.userId, 
      type: req.body.type,
      description: req.body.description,
    });

    res.status(201).json([newChatbot]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


app.get('/users/:userId/chatbots', async (req, res) => {
 

  User.findOne({
    where: { userId: req.params.userId },
    include: Chatbot,
  })
    .then(user => {
      if (!user) {
        res.status(404).json({ error: 'Author not found.' });
      } else {
        res.json(user.Chatbots);
      }
    })
    .catch(error => res.status(400).json({ error: 'Could not fetch author.' }));
});


app.get("/chatbots/:id", async (req, res) => {
  try {
    Chatbot.findOne({ where: { chatbotId: req.params.id } }).then(chatbot => {
      if (!chatbot) {
        res.status(404).json({ error: 'Chatbot not found.' });
      } else {
        res.json(chatbot);
      }
    })
    .catch(error => res.status(400).json({ error: 'Could not fetch chatbot.' }));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/chatbots/:chatbotId", async(req,res)=>{
  try{
    Chatbot.findOne({ where: { chatbotId: req.params.chatbotId } }).then(chatbot => {
      if (!chatbot) {
        res.status(404).json({ error: 'Chatbot not found.' });
      } else {
        chatbot.update({
          chatbot_name: req.body.chatbot_name,
          type: req.body.type,
          description: req.body.description,
        })
        res.json(chatbot);
      }
    })
  }catch(error){
    res.status(400).json({ error: error.message });
  }
});


app.delete("/chatbots/:chatbotId", async(req,res)=>{
  try{
    Chatbot.findOne({ where: { chatbotId: req.params.chatbotId } }).then(chatbot => {
      if (!chatbot) {
        res.status(404).json({ error: 'Chatbot not found.' });
      } else {
        chatbot.destroy()
        res.json("chatbot deleted");
      }
    })
  }catch(error){
    res.status(400).json({ error: error.message });
  }
});


// conversation operations from here


app.post('/chatbots/:chatbotId/conversations', async (req, res) => {
  try {
    const chatbot = await User.findByPk(req.params.chatbotId);

    if (!chatbot) {
      return res.status(404).json({ message: 'chatbot not found' });
    }

    const newConversation = await Conversation.create({
      conversation_title: req.body.conversation_title,
      chatbotId: req.params.chatbotId, 
      status: req.body.status,
    });

    res.status(201).json([newConversation]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


app.get('/chatbots/:chatbotId/conversations', async (req, res) => {
 
  Chatbot.findOne({
    where: { chatbotId: req.params.chatbotId },
    include: Conversation,
  })
    .then(chatbot => {
      if (!chatbot) {
        res.status(404).json({ error: 'chatbot not found.' });
      } else {
        res.json(chatbot.Conversations);
      }
    })
    .catch(error => res.status(400).json({ error: 'Could not fetch chatbot.' }));
});


app.get("/conversations/:conversationId", async (req, res) => {
  try {
    Conversation.findOne({ where: { conversationId: req.params.conversationId } }).then(conversation => {
      if (!conversation) {
        res.status(404).json({ error: 'Conversation not found.' });
      } else {
        res.json(conversation);
      }
    })
    .catch(error => res.status(400).json({ error: 'Could not fetch conversation.' }));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
 
app.put("/conversations/:conversationId", async(req,res)=>{
  try{
    Conversation.findOne({ where: { conversationId: req.params.conversationId } }).then(conversation => {
      if (!conversation) {
        res.status(404).json({ error: 'Conversation not found.' });
      } else {
        conversation.update({
          conversation_title: req.body.conversation_title,
          status: req.body.status,
        })
        res.json(conversation); 
      }
    })
  }catch(error){ 
    res.status(400).json({ error: error.message });
  }
});
 

app.delete("/conversations/:conversationId", async(req,res)=>{  
  try{
    Conversation.findOne({ where: { conversationId: req.params.conversationId } }).then(conversation => {
      if (!conversation) {
        res.status(404).json({ error: 'Conversation not found.' });
      } else {
        conversation.destroy()
        res.json("conversation deleted");
      }
    })
  }catch(error){
    res.status(400).json({ error: error.message });
  }
});


// enduser operations from here


app.post("/endusers", async(req,res)=>{
  try{
    const newEndUserData = req.body;
    const newEndUser = await EndUser.create(newEndUserData);
    res.status(201).json(newEndUser);
  }catch(error){
    res.status(400).json({ error: error.message });
  }
});

app.get("/endusers", async(req,res)=>{
  try{
    const endusers = await EndUser.findAll();
    res.status(200).json(endusers);
  }catch(error){
    res.status(400).json({ error: error.message });
  }
}
);

app.get("/endusers/:endUserId", async(req,res)=>{
  try{
    const enduser = await EndUser.findOne({ where: { endUserId: req.params.endUserId } });
    res.status(200).json(enduser);
  }catch(error){
    res.status(400).json({ error: error.message });
  }
}
);

app.put("/endusers/:endUserId", async(req,res)=>{
  try{
    const endUserId = req.params.endUserId;
    const endUserData = req.body

    EndUser.findOne({ where: { endUserId: endUserId } }).then(endUser => {
      if(!endUser){
        res.status(404).json({ error: 'EndUser not found.' });
      }else{
        endUser.update(endUserData, { where: { endUserId: endUserId } });
        res.status(200).json(endUser);          
  }}
)}
  catch(error){
    res.status(400).json({ error: error.message });
  }
});


app.delete("/endusers/:endUserId", async(req,res)=>{
  try{
    const endUserId = req.params.endUserId;
    EndUser.findOne({ where: { endUserId: endUserId } }).then(endUser => {
      if(!endUser){
        res.status(404).json({ error: 'EndUser not found.' });
      }else{
        endUser.destroy();
        res.status(200).json("enduser deleted");          
  }}
)}
  catch(error){
    res.status(400).json({ error: error.message });
  }
});

// server start

sequelizeDB.sync().then(() => {
    app.listen(3000, () => {
      console.log(`Server is running on port 3000`);
    });
  });