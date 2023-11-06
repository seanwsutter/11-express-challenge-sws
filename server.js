const fs = require("fs");
const express = require("express")
const path = require("path")

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"))

app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "public/notes.html")));

app.get("/api/notes", (req, res) => res.sendFile(path.join(__dirname, "db/db.json")));

// delete 

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);




