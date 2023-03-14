'use strict'

// this is the book schema we're going to use
const mongoose = require('mongoose');

// Schema deconstructor.  We take in the mongoose parsed data and break it down into key value pairs.
const { Schema } = mongoose;


// New schema is broken down from here
const bookSchema = new Schema ({
  title: {type: String, required: true},
  description: {type: String, required: true}, 
  status: {type: String, required: true}, 
});

// define the model
const BookModel = mongoose.model('Book', bookSchema);

// Export 
module.exports = BookModel;

