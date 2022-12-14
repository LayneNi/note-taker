const express = require('express');
const path = require('path');
const fs = require('fs');
const data = require('./db/db.json')
// const util = require('util');
const PORT = process.env.port || 3001;
const app = express();


// const readFromFile = util.promisify(fs.readFile);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET request for notes
app.get('/notes', (req, res) => {
  // Send a message to the client
  res.sendFile(path.join(__dirname, '/public/notes.html'))
  console.log(data);
  // readFromFile('./db/db.json').then((data) => {
  //   console.log(JSON.parse(data));
  //   res.json(JSON.parse(data))
  // });
  // res.status(200).json(`${req.method} request received to get reviews`);

  // Log our request to the terminal
  console.info(`${req.method} request received to get notes`);
});

// POST request to add a note
app.post('/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a notes`);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;
console.info('req.body');
  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
    };


    // Obtain existing notes
    
    fs.readFile("./db/db.json", "utf8", (err, data)=>{
      if (err) {
        console.error(err);
      } else {
       console.log(data) 
        // Convert string into JSON object
        console.log('ping');
        console.log('data');
        const parsedNotes = JSON.parse(data);
        writeToFile("/notes", parsedNotes)
      
        // Add a new note
        parsedNotes.push(newNote);
console.info('newNote');
        // Write updated note back to the file
        fs.writeFile(
          './db/db.json',
          JSON.stringify(parsedNotes, null),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated notes!')
        );
        }
    });

    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting review');
  }
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
