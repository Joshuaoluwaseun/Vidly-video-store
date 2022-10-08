const Joi = require('joi');
const mongoose = require('mongoose');

const vidlySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    }
})

const Genre = mongoose.model('Genre', vidlySchema);

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).max(20).required()
    }

    return Joi.validate(genre, schema);
}

exports.vidlySchema = vidlySchema;
exports.Genre = Genre;
exports.validate = validateGenre;