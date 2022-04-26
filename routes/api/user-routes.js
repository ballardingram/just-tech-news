const router = require('express').Router();
const req = require('express/lib/request');
const res = require('express/lib/response');
const {User} = require('../../models');
const { restore } = require('../../models/User');

// GET > API/USERS
router.get('/',(req,res) => {
    // NOTE > Access our User model and run .findAll() method
    User.findAll()
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET > /API/USERS/1
router.get('/:id', (req,res) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST > /API/USERS
router.post('/', (req,res) => {
    // NOTE > EXPECTS {username: 'Lernantino', email: 'lernantino@gmail.com', password:'password1234'}
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// PUT > /API/USERS/1
router.put('/:id', (req,res) => {
    // NOTE > EXPECTS {username: 'Lernantino', email: 'lernantino@gmail.com', password:'password1234'}
    // NOTE > if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
    User.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData[0]) {
            res.status(404).json({message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE > /API/USERS
router.delete('/', (req,res) => {});

// DELETE > /API/USERS/1
router.delete('/:id', (req,res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;