const Joi = require('joi');

module.exports = function () {
    Joi.objectyId = require('joi-objectid')(Joi);
}