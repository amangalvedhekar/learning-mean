const jwtSimple = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');
const router = require('express').Router();
const ramda = require('ramda');
const User = require('./models/User');


const register = (req, res) => {
  const userData = req.body;
  const user = new User(userData);
  user.save((err, result) => {
    if (err) {
      console.log('error in saving user');
    } else {
      res.status(200).send(user)
    }
  });
};

const comparePasswords = (err, isMatch, res) => {
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
};

const login = async (req, res) => {
  const loginData = req.body;
  try {
    const user = await User.findOne({
      email: loginData.email
    });
    if (!user) {
      return res
        .status(401)
        .send({
          message: 'Not Found'
        });
    }

    bcrypt.compare(
      loginData.userPassword,
      user.userPassword,
      ramda.partialRight(
        comparePasswords,
        [res]
      )
    );
  } catch(e) {
    return res
      .status(404)
      .send({
      message: 'User Not found'
    });
  }

};

router.post('/login', login);

router.post('/register', register);

module.exports = router;
