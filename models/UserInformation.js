const mongoose = require('mongoose');

const userInformationSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  middleName: String,
  description: String,
  userReference: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model(
  'UserInformation',
  userInformationSchema
);
