const Chat = require('../models/chat');

/* Get All Chats */ 

module.exports.getAllChats = (callback) =>
{
    Chat.find(callback).populate('user').populate('contact');
}

/* Get Chat By ID */

module.exports.getChatByID = (id, callback) => 
{
    Chat.findById(id, callback).populate('user').populate('contact');
}

/* Add New Chat */

module.exports.newChat = (newChat, callback) => 
{
    newChat.save(callback);
}

/* Update Chat */

module.exports.updateChat = (id, newData, callback) => 
{
    Chat.findByIdAndUpdate(id, {$set: newData}, callback);
}

/* Delete Chat */

module.exports.deleteChat = (id, callback) =>
{
    Chat.findByIdAndRemove(id, callback);
}