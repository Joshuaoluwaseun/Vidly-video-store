const winston = require('winston')
const mongoose = require('mongoose')


module.exports = function() { 
    mongoose.connect('mongodb://localhost:27017/vidly-database')
    .then(() => winston.info('connected to the database...'))
}
