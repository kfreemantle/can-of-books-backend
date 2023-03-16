'use strict'

// if we use this .js file to contain all of our book handling functions we can have a cleaner server.js file with more explicit references to the models

const Books = require('./books');

// empty object to hold our processed book functions
const bookShelf = {};

// getBooks function for querying the DB
bookShelf.getBooks = async function(req, res, next) {
  try {
    let results = await Books.find({});
    res.status(200).send(results);
  } catch(err) {
    next(err);
  }
}


bookShelf.postBooks = async function(req, res, next) {
  try {
    let createdBook = await Books.create(req.body);
    res.status(200).send(createdBook);
  } catch(err) {
    next(err);
  }
}

bookShelf.deleteBooks = async function(req, res, next) {
  try {
    let id = req.params.id;
    await Books.findByIdAndDelete(id);
    res.status(200).send('Book burned.');
  } catch(err) {
    next(err);
  }
}

bookShelf.putBooks = async function (req, res, next) {
  try {
    let id = req.params.id;  // required to target book for update by
    let updatedBook = req.body;
    // per lecture:
    // findByIdAndUpdate method takes in 3 arguments:
    // - 1. id of the thing in the database to update
    // - 2. Updated data object
    // - 3. options object
    let updatedBookFromDB = await Books.findByIdAndUpdate(id, updatedBook, { new: true, overwrite: true }); // new:true and overwrite:true should allow us to overwrite the targetted by ID book with a new book
    res.status(200).send(updatedBookFromDB);
    
  } catch (err) {
    next(err);
  }
}


module.exports = bookShelf;
