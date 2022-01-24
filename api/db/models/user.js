const mongoose = require('mongoose');

const {userConnection, chatConnection} = require('../mongoose');

const UserSchema = new mongoose.Schema({
    name:
    {
        type: String,
        require: true,
    },
    username:
    {
        type: String,
        require: true,
        unique: true        
    },
    description:
    {
        type: String,
        require: true
    },
    password:
    {
        type: String,
        require: true
    },
    image:
    {
        type: String
    }
});

const User = module.exports = userConnection.model('User', UserSchema);