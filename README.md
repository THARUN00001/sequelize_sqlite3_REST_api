# sequelize_sqlite3_REST_api

# Chatbot Management API

This is a RESTful API built using Express.js that allows you to manage users, chatbots, conversations, and end users.

## Getting Started

To set up and run the API locally, follow these steps:

1. Clone this repository to your local machine.
2. Install the required dependencies using `npm install`.
3. Make sure `SQLite3`and Latest `Node.js` is installed on your local machine.
4. Modify `config/sequelizeDB.js` file with your Sequelize configuration if you have username and password (By default it dosen't have).
5. Run `node index.js` to start the server. The API will run on port 3000 by default.
6. After running the server a SQLite3 DB file will be created to store data here file name is `sequelize_REST-API_DB.sqlite`.
7. Open `postman` or `any other REST API client` and use URL `http://localhost:3000/Endpoint` and give the body data for `POST` requests in `RAW JSON` format and send the request.

## API Endpoints

### Users

- `POST /users` - Create a new user
- `GET /users` - List all users
- `GET /users/:id` - Retrieve a single user
- `PUT /users/:id` - Update a user
- `DELETE /users/:id` - Delete a user

### Chatbots

- `POST /users/:userId/chatbots` - Create a new chatbot for a user
- `GET /users/:userId/chatbots` - List all chatbots for a user
- `GET /chatbots/:chatbotId` - Retrieve a single chatbot
- `PUT /chatbots/:chatbotId` - Update a chatbot
- `DELETE /chatbots/:chatbotId` - Delete a chatbot

### Conversations

- `POST /chatbots/:chatbotId/conversations` - Start a new conversation for a chatbot
- `GET /chatbots/:chatbotId/conversations` - List all conversations for a chatbot
- `GET /conversations/:conversationId` - Retrieve a single conversation
- `PUT /conversations/:conversationId` - Update a conversation (e.g., mark as completed)
- `DELETE /conversations/:conversationId` - End/delete a conversation

### EndUsers

- `POST /endusers` - Register a new end user
- `GET /endusers` - List all end users
- `GET /endusers/:endUserId` - Retrieve details of a single end user
- `PUT /endusers/:endUserId` - Update end user details
- `DELETE /endusers/:endUserId` - Delete an end user

## Data Model

The API uses the Sequelize ORM to manage the following entities:

- User
- Chatbot
- Conversation
- EndUser

## Dependencies

- Express.js
- Sequelize
- SQLite
- body-parser

## Contributing

Contributions are welcome! If you find any issues or want to enhance the API, feel free to submit a pull request.

