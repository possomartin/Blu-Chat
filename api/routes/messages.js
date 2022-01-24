const express = require('express');
const router = express.Router();

const MessagesController = require('../db/controllers/message-controller');
const Message = require('../db/models/message');

/** All Messages */

router.get('/all', (req, res) => {
    MessagesController.getAllMessages((err, messages) => {
       if(err) throw err;
       
       if(messages)
       {
           res.status(200).send(messages);
       }
    });
});

/** GET Message By ID */

router.get('/:id', (req, res) => {
    MessagesController.getMessageByID(req.params.id, (err, message) => {
        if(err) throw err;

        if(message)
        {
            res.status(200).send(message);
        }
    });
});

/** Send Message */

router.post('/new-message', (req, res) => {
    let newMessage = new Message({
        message: req.body.message,
        sender: req.body.sender,
        receiver: req.body.receiver,
        chat: req.body.chat,
        dateSent: req.body.dateSent
    });

    MessagesController.sendMessage(newMessage, (err, message) => {
        if(err) throw err;

        if(message) res.status(200).send(message);
    });
});

/** Update Message */

router.patch('/:id', (req, res) => {
    MessagesController.updateMessage(req.params.id, req.body, (err, message) => {
        if(err) throw err;

        if(message) res.status(200).send(message);
    });
});

/** Delete Message */

router.delete('/:id', (req, res) => {
    MessagesController.removeMessage(req.params.id, (err, message) => {
        if(err) throw err;

        if(message) res.status(200).send(message);
    });
});

module.exports = router;