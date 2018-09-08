const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

app.use(bodyParser.urlencoded({
  extended:false
}));
app.use(bodyParser.json());


// database configuration
const db = require('./config/keys').mongoURI;

//connecting with mongoDB
mongoose.connect(db, { useNewUrlParser: true })
.then(
  () => console.log('Sucessfully connected')
).catch(err => console.log(err));

app.get('/',(req,res) => res.send('WWW'));

app.use('/api/users',users); // go to const with same name above
app.use('/api/profile',profile);
app.use('/api/posts',posts);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Running on port : ${port}`));