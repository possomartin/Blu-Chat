const mongoose = require('mongoose');

const {userConnection, chatConnection} = require('../mongoose');

const UserModel = require('./user');
const ChatModel = require('./chat');

const MessageSchema = new mongoose.Schema({
    message:
    {
        type: String,
        require: true
    },
    sender:
    {
        type: mongoose.Types.ObjectId,
        ref: UserModel
    },
    receiver:
    {
        type: mongoose.Types.ObjectId,
        ref: UserModel    
    },
    chat:
    {
        type: mongoose.Types.ObjectId,
        ref: ChatModel
    },
    dateSent:
    {
        type: Date,
        require: true,
        default: Date.now
    }
});

const Message = module.exports = chatConnection.model('Message', MessageSchema);