/*
* Server.js file used for run server and Start database conenction
*/
require('dotenv').config()
const app = require('./src/app')
const connectDB = require('./src/config/database')

connectDB(); //database

app.listen(3000,()=>{
    console.log('Server is Start at PORT no. 3000');
    
})