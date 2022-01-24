const Message = require('../models/message');

/* Get All Messages */

module.exports.getAllMessages = (callback) => {
    Message.find(callback).populate('sender').populate('receiver').populate('chat');
}

/* Get Message By ID */

module.exports.getMessageByID = (id, callback) => {
    Message.findById(id, callback).populate('sender').populate('receiver').populate('chat');
}

/* Send Message */

module.exports.sendMessage = (newMessage, callback) =>
{
    newMessage.save(callback);
}

/* Update Message */

module.exports.updateMessage = (id, newData, callback) =>
{
    Message.findByIdAndUpdate(id, {$set: newData}, callback);
}

/* Delete Message */

module.exports.removeMessage = (id, callback) => {
    Message.findByIdAndRemove(id, callback);
}