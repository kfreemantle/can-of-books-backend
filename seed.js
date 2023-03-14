'use strict';

require('dotenv').config();

const mongoose = require('mongoose');

// connecting to the Books schema
const Books = require('./modules/books.js');

async function seed() {

  // mongoose.connect needs to live in the seed function
  mongoose.connect(process.env.MONGO_DB_URL);
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log('Mongoose is connected');
  });

  await Books.create({
    title: 'Three Men In A Boat (To Say Nothing of the Dog',
    author: 'Jerome K. Jerome',
    description: 'A humorous account of a two week boating holiday on the Thames river.',
    status: 'Unread'
  });
  console.log('TMIaB created and logged')

  await Books.create({
    title: 'The Gangs of New York',
    author: 'Herbert Asbury',
    description: 'An informal history of street gangs in 19th century New York City.',
    status: 'Unread'
  })
  console.log('Gangs of New York created and logged.')

  await Books.create({
    title: 'War Is A Racket',
    author: 'Smedley D. Butler',
    description: 'A seminal anti-war work from one of the most decorated servicemen in U.S. military history.',
    status: 'Read'
  })
  console.log('War Is A Racket created and logged.');

  // we have to disconnect when we're not using the connection anymore
  mongoose.disconnect();
}

seed();