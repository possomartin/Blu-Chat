const mongoose = require('mongoose');

const {userConnection, chatConnection} = require('../mongoose');

const UserModel = require('./user');

const ContactSchema = new mongoose.Schema({
    user:
    {
        type: mongoose.Types.ObjectId,
        ref: UserModel
    },
    contactList:
    [{
        type: mongoose.Types.ObjectId,
        ref: UserModel
    }]
});


const Contact = module.exports = userConnection.model('Contact', ContactSchema);