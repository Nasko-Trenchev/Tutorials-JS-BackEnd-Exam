const mongoose = require('mongoose');

const config = require('./index');

async function initDatabase(){

    mongoose.set('strictQuery', false);

    //TODO - Change DB_URI
    await mongoose.connect(config.DB_URI);
    console.log("Database connected");
}

module.exports = initDatabase;
