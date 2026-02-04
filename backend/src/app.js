/*
 * app.js file used for create Server with express, configure it and schemas Operations
 */

const express = require("express");
const cors = require("cors");
const noteSchema = require("./model/note.model");
const path = require('path')

const app = express(); // create instance of express server

app.use(express.json()); // this middleWare helps when client sends request to server to serve this server because over server is not able to handle requests
app.use(cors());
app.use(express.static('./public'))

// POST API
app.post("/api/notes", async(req, res) => {
  const { title, description } = req.body;

  const note = await noteSchema.create({
    title,
    description,
  });

  res.status(201).json({
    message: "Notes is created successfully!",
    note,
  });
});

// GET API
app.get('/api/notes',async(req,res)=>{
    const note = await noteSchema.find()

    res.status(200).json({
        message:"all notes are fetch successfully!",
        note
    })
})

// DELETE API
app.delete('/api/notes/:id',async(req,res)=>{
    const {id} = req.params

    await noteSchema.findByIdAndDelete(id)

    res.status(200).json({
        message:"sucessfully deleted!"
    })
})

// PATCH API
app.patch('/api/notes/:id',async(req,res)=>{
    const {id} = req.params
    const {title, description} = req.body

    const note = await noteSchema.findByIdAndUpdate(
        id,
        {title, description},
        {new:true}
    )
    res.status(200).json({
        message:"note updated!",
    })
})

// WILD CARD ENTRY
app.use('*name',(req,res)=>{
    res.sendFile(path.json(__dirname,'..','public','index.html'))
})

module.exports = app;
