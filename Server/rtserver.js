const express = require('express');
const app = express();
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
//TODO: Socket IO event establish
http.listen(PORT, () => {
  console.log(`Server listening on Port ${PORT}`);
});
