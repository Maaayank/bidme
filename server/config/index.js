require('dotenv').config()

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {

    development: {
        port: parseInt(process.env.PORT, 10) || 5000,
    },

    jwt: {
        jwt_secret: process.env.JWT_SECRET,
        salting_rounds: parseInt(process.env.SALTING_ROUNDS, 10),

    },

    database: {
        uri: process.env.MONGODB_URI,
    },


    logs: {
        level: process.env.LOG_LEVEL || 'dev',
    }

};