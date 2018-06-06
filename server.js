const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwtSimple = require('jwt-simple');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcrypt-nodejs');

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

app.post('/register', (req, res) => {
  const userData = req.body;
  const user = new User(userData);
  user.save((err, result) => {
    if (err) {
      console.log('error in saving user');
    } else {
      res.status(200).send(user)
    }
  });
});

app.post('/login', async (req, res) => {
  const loginData = req.body;

  const user = await User.findOne({
    email: loginData.email
  });
  if (!user) {
    return res
      .status(401)
      .send({
        message: 'Invalid email or password'
      });
  }

  bcrypt.compare(loginData.userPassword, user.userPassword, (err, isMatch) => {
    if(!isMatch) {
      return isMatch
        .status(401)
        .send({
          message: 'Invalid email or password'
        });
    }

    const userAccessToken = jwtSimple.encode({}, '123', null, {});
    console.log(userAccessToken);
    res
      .status(200)
      .send({ userAccessToken });
  });
});

mongoose.connect('mongodb://localhost/pssocial', err => {
  if (!err) {
    console.log('connected to mongo');
  }
});
app.listen(3000);
