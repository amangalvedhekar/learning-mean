const mongoose = require('mongoose');

const UserInformationSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  middleName: String,
  description: String,
  userReference: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});
