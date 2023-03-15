'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Books = require('./modules/books.js');

// we tap Mongoose here
const mongoose = require('mongoose');


// connecting the DB via mongoose
// add validation to confirm we are wired up to our mongo DB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

// connecting Mongoose to our MongoDB instance
mongoose.connect(process.env.MONGO_DB_URL);


// EXPRESS invocation here
const app = express();
// CORS invocation here
app.use(cors());
// in order to get JSON data from a request we need go tell Express to use it explicitly
app.use(express.json());

// if port 3002 shows up we know something is awry
const PORT = process.env.PORT || 3002;


// Routes 

// test route
app.get('/', (request, response) => {
  response.status(200).send('Server is live!');
});

// books route
app.get('/books', getBooks);
app.post('/books', postBooks);
app.delete('/books/:id', deleteBooks);  // delete needs the :id in order to target a unique book

async function getBooks(req, res, next) {
  try {
    let results = await Books.find({});
    res.status(200).send(results);
  } catch(err) {
    next(err);
  }
}  // getBooks is for finding books already in the DB

async function postBooks(req, res, next) {
  try {
    let createdBook = await Books.create(req.body);
    res.status(201).send(createdBook); // 201: Created success
  } catch(err) {
    next(err);
  }
}

async function deleteBooks(req, res, next) {
  try {
    let id = req.params.id;
    await Books.findByIdAndDelete(id);
    res.status(200).send('Book burned.');
  } catch(err) {
    next(err);
  }
}

app.get('*', (request, response) => {
  response.status(404).send('Server not available, book not found.');
});



// Error handling
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});  // I think this is broken


// Listen
app.listen(PORT, () => console.log(`listening on ${PORT}`));