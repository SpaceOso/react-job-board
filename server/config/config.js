const dotenv = require('dotenv').config();

module.exports = {
    "development": {
        "username": process.env.DEV_DB_USER,
        "password": process.env.DEV_DB_PASS,
        "database": process.env.DEV_DB,
        "host": process.env.DEV_DB_HOST,
        "port": process.env.DEV_DB_PORT,
        "dialect": "postgres"
    }
};