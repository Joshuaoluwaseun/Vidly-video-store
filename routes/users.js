
const admin = require('../middleware/admin');
const auth = require('../middleware/auth')
const { validate, User } = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const config = require('config');
const router = express.Router();

router.get('/me', auth, async (req, res, next) => {
        const user = await User.findById(req.user._id).select('-password');
        res.send(user);
})

// Registering users route
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).send('user already exist')

    user = new User(_.pick(req.body, ['name', 'email', 'password']));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
 
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
})

router.delete('/:id', [auth, admin], async (req, res) => {
    const user = await User.findOneAndRemove(req.params.id);
    if (!user) return res.status(404).send('the user with the given ID is not found');

    res.send(user);
})


module.exports = router;