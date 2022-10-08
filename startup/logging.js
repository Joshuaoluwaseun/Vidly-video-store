require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');

module.exports = function () {
    winston.exceptions.handle(new winston.transports.File({
        filename: 'uncaughtExceptions.log'
    }))
    
    process.on('unhandledRejection', (ex) => {
        throw ex;
    })
    
    winston.add(new winston.transports.File({ filename: 'logfile.log'}));
    winston.add(winston.transports.MongoDB, { 
        db: 'mongodb://localhost/vidly-database',
        level: 'info'
    })

    const logger = winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        transports: [
          new winston.transports.Console(),
          new winston.transports.File({ filename: 'logfile.log' })
        ]
      });
      
      logger.info('it works!!')
}