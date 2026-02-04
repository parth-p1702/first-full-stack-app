/*
* database.js file used for connect with database that exits on over cluster
*/

const mongoose  = require('mongoose')

const connectDB = async() => {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Database connected');
}

module.exports = connectDB;