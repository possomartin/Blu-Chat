const express = require('express');
const router = express.Router();

const auth = require('../helpers/auth');

const UserController = require('../db/controllers/user-controller');
const User = require('../db/models/user');

/* Get All Users */

router.get('/all', (req, res) => {
    UserController.getAllUsers((err, users) => {
        if(err) throw err;

        if(users)
        {
            res.status(200).send(users);
        }
    });
});

/** Get User By ID */

router.get('/:id', (req, res) => {
    UserController.getUserByID(req.params.id, (err, user) => {
        if(err) throw err;

        if(user) res.status(200).send(user);
    });
});

/* Get User By Username */

router.get('/username/:username', (req, res) => {
    UserController.getUserByUsername(req.params.username, (err, user) => {
        if(err) throw err;

        if(user) res.status(200).send(user);
    });
});

/* Update User */
router.patch('/:id', (req, res) => {
    UserController.updateUser(req.params.id, req.body, (err, user) => {
        if(err) throw err;

        if(!user)
        {
            res.sendStatus(304);
        }
        else
        {
            res.status(200).send(user);
        }
    });
})

/* Remove User */
router.delete('/:id', (req, res) => {
    UserController.deleteUser(req.params.id, (err, user) => {
        if(err)
        {
            res.sendStatus(304);
        }
        else
        {
            res.status(200).send(user);
        }
    });
});

/* Add new User */

router.post('/register', (req, res) => {
    let newUser = new User({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        description: req.body.description,
    });

    UserController.addUser(newUser, (err, user) => {
        if(err)
        {
            res.sendStatus(406);
        }
        else
        {
            res.status(201).send(user);
        }
    });
});

/* Login to Server */

router.post('/login', (req, res) => {
    let {username, password} = req.body;

    UserController.getUserByUsername(username, (err, user) => {
        if(err) throw err;

        if(!user)
        {
            res.sendStatus(404);
        }
        else
        {
            UserController.comparePassword(password, user.password, (err, isMatch) =>
            {
                if(err) throw err;
                
                if(!isMatch)
                {
                    res.sendStatus(406);
                }
                else
                {
                    req.session.isAuth = true;
                    req.session.user = user;
                    req.session.username = user.username;
                    req.session.userId = user._id;
                    res.status(200).send(user);
                }
            });
        }
    });
});

/* Log Out */

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err) throw err;
        res.status(200).json({msg: "Successfully Logout"});
    })
})



module.exports = router;

