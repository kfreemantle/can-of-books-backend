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

// if port 1337 shows up we know something is awry
const PORT = process.env.PORT || 1337;


// Routes 

// test route
// app.get('/', (request, response) => {
//   response.status(200).send('Server is live!');
// });

// books route
app.get('/books', getBooks);
async function getBooks(req, res, next) {
  try {
    let results = await Books.find({});
    res.status(200).send(results);
  } catch(err) {
    next(err);
  }
}

app.get('*', (request, response) => {
  response.status(404).send('Server not available');
});

// Error handling
app.use((error, request, response, next) => {
  res.status(500).send(error.message);
});


// Listen
app.listen(PORT, () => console.log(`listening on ${PORT}`));