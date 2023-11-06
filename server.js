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
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "public/index.html")))
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "public/notes.html")));

// get route for db.json // figure out data type & JSON
app.get("/api/notes", (req, res) => res.sendFile(path.join(__dirname, "db/db.json")));

// post route ( new note )

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
GIVEN a note-taking application
WHEN I open the Note Taker
THEN I am presented with a landing page with a link to a notes page
WHEN I click on the link to the notes page
THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column
WHEN I enter a new note title and the note’s text
THEN a Save icon appears in the navigation at the top of the page
WHEN I click on the Save icon
THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes
WHEN I click on an existing note in the list in the left-hand column
THEN that note appears in the right-hand column
WHEN I click on the Write icon in the navigation at the top of the page
THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column
```

On the back end, the application should include a `db.json` file that will be used to store and retrieve notes using the `fs` module.

The following HTML routes should be created:

* `GET /notes` should return the `notes.html` file.

* `GET *` should return the `index.html` file.

The following API routes should be created:

* `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.

* `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

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




