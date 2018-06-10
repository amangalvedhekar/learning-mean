const mongoose = require('mongoose');

const userSecurityQuestionsSchema = mongoose.Schema({
  userReference: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  questions: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SecurityQuestion',
      },
      answer: String,
    }
  ]
});

module.exports = mongoose.model(
  'UserSecurityQuestion',
  userSecurityQuestionsSchema
);
