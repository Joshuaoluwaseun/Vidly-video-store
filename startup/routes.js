const express = require('express');
const movies = require('../routes/movies');
const customers = require('../routes/customers')
const users = require('../routes/users')
const auth = require('../routes/auth')
// const rentals = require('../routes/rental')
const genres = require('../routes/genres')
const error = require('../middleware/error')
// const morgan = require('morgan');
// const helmet = require('helmet');

module.exports = function(app) {
    app.use(express.json()); 
// app.use('/api/rentals', rentals)
app.use('/api/users', users)
app.use('/api/auth', auth)
// app.use(helmet());
app.use('/api/genres', genres);
app.use('/api/movies', movies)
app.use('/api/customers', customers);           
app.use(error);
}


// if (app.get('env') === 'development') {
//     app.use(morgan('tiny'));
//     console.log('morgan enabled...')
// }
