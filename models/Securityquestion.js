const mongoose = require('mongoose');

const securityQuestionSchema = new mongoose.Schema({
  question: String,
});

module.exports = mongoose.model(
  'SecurityQuestion',
  securityQuestionSchema
);
