/*
* note.model.js file used for create schema and model so we can perform operation easily
*/

const mongoose = require('mongoose')

const notes = new mongoose.Schema({
    title:String,
    description:String
})

const noteSchema = mongoose.model('note',notes);

module.exports = noteSchema;