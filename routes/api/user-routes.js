const router = require('express').Router();
const res = require('express/lib/response');
const {User} = require('../../models');

// GET > ALL API/USERS
router.get('/',(req,res) => {
    // NOTE > Access our User model and run .findAll() method
    User.findAll({
        attributes: { exclude: ['password']}
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET > SINGLE /API/USERS/1
router.get('/:id', (req,res) => {
    User.findOne({
        attributes: { exclude: ['password']},
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

// PROCESS > LOGIN AND PASSWORD VALIDATION
router.post('login', (req,res) => {
    // NOTE > EXPECTS {email: 'lernantino@gmail.com', password: 'password1234'}
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {
        if(!dbUserData) {
            res.status(400).json({message: 'No user with that email address'});
            return;
        }
        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json ({ message: 'Incorrect password!'});
            return;
        }
        res.json({user: dbUserData,message:'You are now logged in!'});
        return;
    });
});

// PUT > /API/USERS/1
router.put('/:id', (req,res) => {
    // NOTE > EXPECTS {username: 'Lernantino', email: 'lernantino@gmail.com', password:'password1234'}
    // NOTE > if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
    User.update(req.body, {
        individualHooks: true,
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