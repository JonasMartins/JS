const express = require('express');
const mongoose = require('mongoose');
const app = express();

// database configuration
const db = require('./config/keys').mongoURI;

// connecting with mongoDB
mongoose.connect(db)
.then(
  () => console.log('Sucessfully connected')
).catch(err => console.log(err));

app.get('/',(req,res) => res.send('hello world'));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Running on port : ${port}`));