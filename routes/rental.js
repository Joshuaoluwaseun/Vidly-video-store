const {Rentals, validate} = require('../models/rentals');
// const {Genre} = require('../models/genre')
const express = require('express');
const fawn = require('fawn')
const router = express.Router();
const mongoose = require('mongoose');
const Fawn = require('fawn');

fawn.init(mongoose);

router.get('/', async (req, res) => {
    const rental = await Rentals.find().sort('-dateOut');
    res.send(rental);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Invalid customer.');

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send('Invalid movie.');

  if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');

    let rental = new Rentals({ 
        customer: {
            _id: customer._id,
            name: customer.name, 
            phone: customer.phone
          },
          movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
          }
    });
   
    try{
      const task = new Fawn.Task();
      task.save('rentals', rental)
        .update('movies', {id: movie._id}, {
          $inc:{ numberInStock: -1 }
        })
        .run();
        
        res.send(rental);
    }
    catch(err){
      res.status(500).send('something failed');
    }

});

router.get('/:id', async (req, res) => {
    const rental = await Rentals.findById(req.params.id);
  
    if (!rental) return res.status(404).send('The rental with the given ID was not found.');
  
    res.send(rental);
  });

module.exports = router;