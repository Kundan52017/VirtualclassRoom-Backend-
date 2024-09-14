const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  lecture: { type: mongoose.Schema.Types.ObjectId, ref: 'Lecture', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  replies: [{
    content: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }]
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
