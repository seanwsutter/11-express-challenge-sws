const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsHelpers');

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
  readFromFile('./db/diagnostics.json', "utf-8", (err, data) => res.json(JSON.parse(data)))
});


// POST Route for a error logging
diagnostics.post('/', (req, res) => {
  // TODO: Logic for appending data to the db/diagnostics.json file
    const { username, topic, tip } = req.body;
    if (req.body) {
      const newDiagnostics = {
        time = '',
        error_id: uvidv4(),
        errors: {
          tip: tip,
          topic: topic,
          username: username
  
        }
      }
      readAndAppend(newDiagnostics,"./db/diagnostics.")
});


module.exports = diagnostics;
       