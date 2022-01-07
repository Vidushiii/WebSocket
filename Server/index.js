const express = require('express');
const mongoose = require('mongoose');
const { Post, Users, Posts } = require('./model');
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

app.post('/post');
app.post('/comment')
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

app.listen(PORT, () => {
  console.log(`Server listening on Port ${PORT}`);
});