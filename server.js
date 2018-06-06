const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/User');
const auth = require('./auth');

mongoose.Promise = Promise;

const app = express();

const posts = [
  { message: 'hello' },
  { message: 'world' }
];

app.use(cors());
app.use(bodyParser.json());

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, '-userPassword -__v');
    res.status(200).send(users);
  } catch (e) {
    console.log('error in getting user list', e);
    res.status(500).send(e)
  }
});

app.get('/profile/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id, '-userPassword -__v');
    res.status(200).send(user);
  } catch (e) {

  }
});


mongoose.connect('mongodb://localhost/pssocial', err => {
  if (!err) {
    console.log('connected to mongo');
  }
});

app.use('/auth', auth);

app.listen(3000);
