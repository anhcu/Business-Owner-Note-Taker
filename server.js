// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs')
const uuid = require('uuid')
const notes = require("./db/db.json");


// Sets up the Express App
const app = express();
const PORT = 8080;


//This gets notes saved and joins it in db.json
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"))
});


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//please explain<-------------------------------------------------------------------------
//pulling files from public (css and index.js) right????
app.use(express.static("public"));


// Post function to add new notes to db.json
//Can I go back and add thing appond what I have save already????????????????????????/
app.post("/api/notes", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const newNotes = req.body;
    //please explain uuid.v4<-------------------------------------------------------------------
    newNotes.id = uuid.v4();
    notes.push(newNotes);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes))
    res.json(notes);
});


//used for deleting notes
//can you break down this delete part?<----------------------------------
app.delete("/api/notes/:id", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const delNote = notes.filter((rmvNote) => rmvNote.id !== req.params.id);
    fs.writeFileSync("./db/db.json", JSON.stringify(delNote));
    res.json(delNote);
})




//call home page 
app.get('/', ( req, res ) => res.sendFile( path.join( __dirname, './public/index.html') ) );
//state listen
app.get('/notes',( req, res ) => res.sendFile( path.join( __dirname, './public/notes.html') ) );


// Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));