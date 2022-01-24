/* File to handle database connection */

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const mongoUriUsers = process.env.MONGO_URI_USERS;
const mongoUriChat = process.env.MONGO_URI_CHAT;

function makeNewConnection(URI)
{
    const db = mongoose.createConnection(URI, {useNewUrlParser: true});

    /* Handle Errors and Connections */

    //Error
    db.on('error', (error) => {
        console.log('Failed to Connect to MongoDB Connection');
    });

    db.on('connected', () => {
        console.log(`Connected to MongoDB Successfully: ${URI}`);
    });

    db.on('disconnected', () => {
        console.log('Disconnected from MongoDB');
    });

    return db;
    
}

const chatConnection = makeNewConnection(mongoUriChat);
const userConnection = makeNewConnection(mongoUriUsers);

module.exports = {
    chatConnection,
    userConnection
};