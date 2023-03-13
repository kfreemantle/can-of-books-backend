'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');


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

const PORT = process.env.PORT || 3001;

app.get('/test', (request, response) => {

  response.send('test request received')

})

app.listen(PORT, () => console.log(`listening on ${PORT}`));