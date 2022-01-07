const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

const postsSchema = new mongoose.Schema(
  {
    postContent: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    comment: { type: [commentSchema] },
  },
  {
    timestamps: true,
  },
);

const Posts = mongoose.model('Post', postsSchema);
const Users = mongoose.model('User', userSchema);

module.exports = {Posts, Users};
