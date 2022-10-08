const Joi = require('joi');
const vidlySchema = require('./genre');
const mongoose = require('mongoose');

const Movies = mongoose.model('Movies', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 20
    },
    genre:  {
        name: vidlySchema
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 50
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 50
    }
}));

function validateMovie(movie) {
    const schema = {
        title: Joi.string().min(3).max(20).required(),
        genreID: Joi.objectId().required(),
        numberInStock: Joi.number().min(3).max(20).required(),
        dailyRentalRate: Joi.number().min(3).max(20).required()
    }

    return Joi.validate(movie, schema);
}

exports.validate = validateMovie;
exports.Movies = Movies;
