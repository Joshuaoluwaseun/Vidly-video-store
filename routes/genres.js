const auth = require('../middleware/auth')
const _ = require('lodash');
const { Genre, validate } = require('../models/genre')
const express = require('express');
// const { async } = require('jshint/src/prod-params');
const router = express.Router();

router.get('/', auth, async (req, res) => {
        const genres = await Genre.find().sort('name');
        res.send(genres);
});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({ name: req.body.name });
    
    genre = await genre.save(genre);
    res.send(genre);
})

router.put('/:id', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findOneAndUpdate(req.params.id, {name: req.body.name}, {new: true});
   if (!genre) return res.status(404).send('the genre with the given ID is not found');

    res.send(genre);
});

router.delete('/:id', auth, async (req, res) => {
    const genre = await Genre.findOneAndRemove(req.params.id);
    if (!genre) return res.status(404).send('the genre with the given ID is not found');

    res.send(genre);
})

router.get('/:id', auth, async (req, res) => {
    const genre = await Genre.findById(req.params.id);

    if (!genre) return res.status(404).send('the genre with the given ID is not found');
    res.send(genre);
});

module.exports = router;