const mongoose = require('mongoose');

const {userConnection, chatConnection} = require('../mongoose');

const UserModel = require('./user');
const MessageModel = require('./message');

const ChatSchema = new mongoose.Schema({
    user:
    {
        type: mongoose.Types.ObjectId,
        ref: UserModel
    },
    contact:
    {
        type: mongoose.Types.ObjectId,
        ref: UserModel,      
    },
    dateCreated:
    {
        type: Date,
        default: Date.now
    }

});

const Chat = module.exports = chatConnection.model('Chat', ChatSchema);
