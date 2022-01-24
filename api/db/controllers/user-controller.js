const User = require('../models/user');
const bcrypt = require('bcryptjs');

/* Get All Users */

module.exports.getAllUsers = (callback) => {
    User.find(callback);
}

/* Get User By ID */

module.exports.getUserByID = (id, callback) => {
    User.findById(id, callback);
}

/** Get User By username */

module.exports.getUserByUsername = (username, callback) => {
    let query = {username: username}
    
    User.findOne(query, callback);
}

/* Add User */
module.exports.addUser = (newUser, callback) => 
{
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

/* Update User */

module.exports.updateUser = (id, newData, callback) => {
    User.findOneAndUpdate({_id: id}, {$set: newData}, callback);
}

/* Delete User */ 
module.exports.deleteUser = (id, callback) => 
{
    User.findByIdAndRemove(id, callback);
}

/* compare password */
module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
      if(err) throw err;
      callback(null, isMatch);
    });
}