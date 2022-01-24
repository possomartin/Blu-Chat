const express = require('express');
const router = express.Router();


const ContactController = require('../db/controllers/contact-controller');
const Contact = require('../db/models/contact');

/** Get All Contacts */

router.get('/all', (req, res) => {
    ContactController.getContactList((err, contactList) => {
        if (err) throw err;

        if(contactList)
        {
            res.status(200).send(contactList);
        }
    });
});

/** Get Contact By ID */

router.get('/:id', (req, res) => {
    ContactController.getContactByID(req.params.id, (err, contact) => {
        if(err) throw err;

        if(contact) res.status(200).send(contact);
    });
});

/**  Add Contact */
router.post('/new-contact-list', (req, res) => {
    let NewContact = new Contact({
        user: req.body.user,
        contactList: req.body.contactList
    });
    ContactController.addContact(NewContact, (err, contactList) => {
        if(err) throw err;

        if(contactList) res.status(200).send(contactList);
    });
});

/** Add Single Contact */
router.patch('/:id/new-contact', (req, res) => {

    console.log(req.body.contact);

    ContactController.addSingleContact(req.params.id, req.body.contact, (err, contactList) => {
        if(err) throw err;

        if(contactList) res.status(200).send(contactList);
    })
});

/** Delete ContactList  */

router.delete('/:id', (req, res) => {
    ContactController.removeContactList(req.params.id, (err, contactList) => {
        if(err) throw err;

        if(contactList) res.status(200).send(contactList);
    });
});

/** Remove Friend */

router.delete('/:id/remove-friend/:friendID', (req, res) => {
    ContactController.removeSingleContact(req.params.id, req.params.friendID, (err, friend) => {
        if(err) throw err;

        if(friend) res.status(200).send(friend);
    });
});

module.exports = router;