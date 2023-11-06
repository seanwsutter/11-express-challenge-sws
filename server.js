// packages
const fs = require("fs");
const express = require("express");
const path = require("path");

const { v4: uuidv4 } = require("uuid");

// express boiler plate
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// get routes for index.html (* default) & notes.html
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "public/notes.html")));
// get route for db.json // figure out data type & JSON
app.get("/api/notes", (req, res) => res.sendFile(path.join(__dirname, "db/db.json")));
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "public/index.html")));


// post route ( new note with unique id)
app.post("/api/notes", (req, res) => {
  const addNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4()
  }
  console.log(addNote);
  // then handle the user input for db.json 
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    console.log(err);
    let dataJSON = JSON.parse(data);

    console.log('check', dataJSON);

    dataJSON.push(addNote)
    console.log('push', dataJSON);
    // fs.writeFile("./db/db.json", JSON.stringify(dataJSON)), "utf-8", (err) => console.log(err);

    fs.writeFile("./db/db.json", JSON.stringify(dataJSON), "utf-8", (err) => { if (err) console.error(err); });
  })
  res.send(addNote);


});
// then handle the user input for db.json 


// express server listening to 3001
app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);

/* comments

1. A route that sends the home page
2. A route that sends the notes page

3. Make routes matching the fetch requests coming from the client-side code

db.json is the make-believe database

When a request comes in for the data:
  - Read the file (fs.readFile)

When a request comes in to make a new note:
  - Read the file 
  - Add the new data 
  - Write a new version of that file

```
WHEN I click on the Write icon in the navigation at the top of the page
THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column
```

## Bonus

You haven’t learned how to handle DELETE requests, but this application offers that functionality on the front end. As a bonus, try to add the DELETE route to the application using the following guideline:

* `DELETE /api/notes/:id` should receive a query parameter that contains the id of a note to delete. To delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.

----------------

const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const PORT = 3001;

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Send out the home page
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public/index.html")));

app.post("/api/newuser", (req, res) => {
  fs.writeFile("signup.txt", req.body.newuser, (err) => {
    if( err ) return res.json({ status: "error"} )
    res.json({ status: "success" })
  })
})

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);


*/




