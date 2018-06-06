const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
  email: String,
  userPassword: String,
});

userSchema.pre('save', function(next) {
  const user = this;

  if(!user.isModified('userPassword')) {
    return next();
  }
  bcrypt.hash(user.userPassword, null,null, (err, hash) => {
    if(err) {
      return next(err);
    }
    user.userPassword = hash;
    next();
  });
});


module.exports = mongoose.model('User', userSchema);
