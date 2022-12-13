const express = require('express');
const path = require('path');
const notes = require('../db/db.json');
const fs = require('fs');
const PORT = process.env.port || 3001;
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api', (req, res) => {
    console.log("Pinging term data")
    console.log(req.method)
    console.log(req.body)
    console.log(req.headers)
    res.json(termData)
}
);

app.get('/api/notes', (req, res) => {
    // Inform the client
    res.json(`${req.method} request received to retrieve upvote count`);

    // Log our request to the terminal
    console.info(`${req.method} request received to retrieve upvote count`);
    console.log("Pinging term data")
    console.log(req.method)
    console.log(req.body)
    console.log(req.headers)
});



// POST request to add a review
app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`);
  
    // Prepare a response object to send back to the client
    let response;
  
    // Check if there is anything in the response body
    if (req.body) {
      console.log(notes)
      notes.push(req.body)
      console.log(notes)
      res.status(201).json(response);
  
    } else {
      res.status(400).json('Request body must at least contain a notes');
    }
  
    // Log the response body to the console
    console.log(req.body);
  });
  
  
  app.listen(PORT, () =>
    console.log(`Express server listening on port ${PORT}!`)
  );


// app.get('/api/notes', (req, res) => {
//     console.log("Pinging term data")
//     console.log(req.method)
//     console.log(req.body)
//     console.log(req.headers)
//     res.json(termData)
// }
// );

app.listen(PORT, () =>
    console.log(`http://localhost:${PORT}!`)
    );


