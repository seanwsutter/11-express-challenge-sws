const fb = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsHelpers');

// GET Route for retrieving all the feedback
fb.get('/', (req, res) =>
  readFromFile('./db/feedback.json', "utf-8", (err, data) => res.json(JSON.parse(data)) )
);

// POST Route for submitting feedback
fb.post('/', (req, res) => {
  // Destructuring assignment for the items in req.body
  const { email, feedbackType, feedback } = req.body;

  // If all the required properties are present
  if (email && feedbackType && feedback) {
    const newFeedback = { email, feedbackType, feedback, feedback_id: uuidv4() };
    readAndAppend(newFeedback, './db/feedback.json', res.json({ status: "success", body: newFeedback }));
  } else {
    res.json('Error in posting feedback');
  }
});

module.exports = fb;
