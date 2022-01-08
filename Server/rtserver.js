const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const { instrument } = require('@socket.io/admin-ui');
const http = require('http').createServer(app);
const PORT = 3510;
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  //Connection established
  socket.send({ socketId: socket.id });
  // Join the room with post ID
  // Broadcast to the postID room

  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`${socket.id} joined`);
    socket.emit('joinedRoom', { message: `${room} joined` });
  });
});

const emitComment = (doc) => {
  io.to(doc._id).emit('comment', doc);
};

app.get('/', (req, res) => {
  res.send('<h1>Hello from the real time server</h1>');
});

app.post('/comment', (req, res) => {
  const { doc } = req.body;
  if (!doc) return res.status(400).json({ message: 'Parameters not found' });
  //TODO: Emit to the postID room
  emitComment(doc);
  return res.status(200).json({ message: 'success' });
});

instrument(io, {
  auth: false,
  readonly: true,
});

http.listen(PORT, () => {
  console.log(`Server listening on Port ${PORT}`);
});
