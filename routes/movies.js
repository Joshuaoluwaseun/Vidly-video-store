const {Movies, validate} = require('../models/movie');
const {Genre} = require('../models/genre')
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
    const movie = await Movies
    .find()
    .sort('name');
    res.send(movie);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('invalid movie')

    let movie = new Movies({ 
        title: req.body.title,
        genre: {
            _id: movie._id,
            name: movie.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
     });
    
    movie = await movie.save(movie);

    res.send(movie);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findOneAndUpdate(req.params.id, {name: req.body.name}, {new: true});
   if (!genre) return res.status(404).send('the genre with the given ID is not found');

   const movie = await Movie.findOneAndUpdate(req.params.id, {
    title: req.body.title,
    genre: {
        _id: genre._id,
        name: genre.name
    },
    numberInStock: req.body.numberInStock,
   }, { new : true})
   if (!movie) return res.status(404).send('the movie with the given ID is not found');

    res.send(movie);
});

router.delete('/:id', async (req, res) => {
    const movie = await Genre.findOneAndRemove(req.params.id);
    if (!movie) return res.status(404).send('the movie with the given ID is not found');

    res.send(movie);
})

router.get('/:id', async (req, res) => {
    const movie = await Genre.findById(req.params.id);

    if (!movie) return res.status(404).send('the movie with the given ID is not found');
    res.send(movie);
});


module.exports = router;