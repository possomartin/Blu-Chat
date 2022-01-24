const Contact = require('../models/contact');

/* Get Contact List */

module.exports.getContactList = (callback) => {
    Contact.find(callback).populate('user').populate('contactList');
}

/* Get Contact by ID */

module.exports.getContactByID = (id, callback) => {
    Contact.findById(id, callback).populate('user').populate('contactList');
}

/* Add contact */

module.exports.addContact = (newContact, callback) =>
{
    newContact.save(callback);
}

/* update a Contact List */

module.exports.updateContact = (id, newData, callback) => 
{
    Contact.findByIdAndUpdate(id, {$set: newData}, callback);
}

/* add single contact */

module.exports.addSingleContact = (id, contact, callback) => 
{
    Contact.findByIdAndUpdate(id, {$push: {contactList: contact}}, callback);
}

/* Delete Contact from List */
module.exports.removeSingleContact = (id, contact, callback) => {
    Contact.findByIdAndUpdate(id, {$pull: {contactList: contact}}, callback);
}


/* Delete Contact List */

module.exports.removeContactList = (id, callback) => {
    Contact.findByIdAndRemove(id, callback);
}