const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const { Users, Posts } = require('./model');
const app = express();
app.use(express.urlencoded({ extended: false }));
const PORT = 3501;

// (async function () {
//   const res = await Post.findByIdAndUpdate('61d80feb081b8eb2cf85d3dc', {$push: { comment: { content: 'This is comment 1' } }});
//   // await Post.updateOne([{postContent: 'This is the post two', comment: {$push: { comment: 'This is comment 1' }}}]);
// })();

//TODO: Database addition

mongoose
  .connect('mongodb://localhost/Forum')
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB...', err));

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

/** Protected routes start here */
app.post('/createUser', async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password)
    return res
      .status(400)
      .json({ ...req.body, message: 'name or password missing' });
  const result = await Users.create({ name, password });
  return res.status(200).json({ ...req.body, message: 'User created', result });
});

app.post('/createPost', async (req, res) => {
  const { content, userID } = req.body;
  if (!content) return res.status(404).json({ message: 'content not found' });
  if (!userID) return res.status(404).json({ message: 'userID not found' });

  const result = await Posts.create({
    postContent: content,
    author: userID,
  });

  res.status(200).json({ message: 'success', result });
});
/** Protected routes end here */

//Login route
app.post('/login', async (req, res) => {
  const { name, password } = req.body;
  const token = password.split('').join('1');
  const result = await Users.findOne({ name });
  if (!result) return res.status(404).json({ message: 'User not found' });
  return result.password === password
    ? res.status(200).json({ ...req.body, token, message: 'success' })
    : res.status(400).json({ ...req.body, message: 'password not match' });
});

//Get all posts route
app.get('/posts', async (req, res) => {
  const result = await Posts.find({});
  if (!result) return res.status(200).json({ message: 'No posts found' });
  return res.status(200).json({ message: 'success', result });
});

// Fetch specific posts
app.get('/posts/:id', async (req, res) => {
  const result = await Posts.findById(req.params.id);
  if (!result) return res.status(200).json({ message: 'No posts found' });
  return res.status(200).json({ message: 'success', result });
});

app.post('/comment', async (req, res) => {
  const { content, postID, userID } = req.body;
  if (!content) return res.status(404).json({ message: 'content not found' });
  if (!postID) return res.status(404).json({ message: 'postID not found' });
  if (!userID) return res.status(404).json({ message: 'userID not found' });

  const result = await Posts.findByIdAndUpdate(
    postID,
    {
      $push: { comment: { content, author: userID } },
    },
    { new: true },
  ).populate('comment.author');
  const {_id, author, comment, createdAt, updatedAt } = result;
  let newComment = comment.pop();
  let resObj = {_id, author, comment: newComment, createdAt, updatedAt}
  // Send a post request
  axios({
    method: 'post',
    url: 'http://localhost:3510/comment',
    data: { doc: resObj},
  })
    .then((res) => console.log(res.data))
    .catch((err) => console.log('Error:', err));
  res.status(200).json({ message: 'success', result: resObj });
});

app.use((err, req, res, next) => {
  console.log(err);
  if (err)
    res.status(500).json({
      message: 'Internal Server Error: Check server logs',
      ...req.body,
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on Port ${PORT}`);
});
