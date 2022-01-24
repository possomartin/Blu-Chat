const express = require('express');
const router = express.Router();

const ChatController = require('../db/controllers/chat-controller');
const Chat = require('../db/models/chat');

/** Get All Chats */

router.get('/all', (req, res) => {
    ChatController.getAllChats((err, chats) => {
        if(err) throw err;

        if(chats) res.status(200).send(chats);
    });
});

/** Get Chat By ID */

router.get('/:id', (req, res) => {
    ChatController.getChatByID(req.params.id, (err, chat) => {
        if(err) throw err;

        if(chat) res.status(200).send(chat);
    });
});

/** New Chat */

router.post('/new-chat', (req, res) => {

    let newChat = new Chat({
        user: req.body.user,
        contact: req.body.contact,
        dateCreated: req.body.dateCreated
    });

    ChatController.newChat(newChat, (err, chat) => {
        if(err) throw err;

        if(chat) res.status(200).send(chat);
    });
});

/** Delete Chat */

router.delete('/:id', (req, res) => {
    ChatController.deleteChat(req.params.id, (err, chat) => {
        if(err) throw err;

        if(chat) res.status(200).send(chat);
    });
});

module.exports = router;