// back-end
require('dotenv').config();
const express = require('express');
const app = express();
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const modelMsg = require('./models/schema');

mongoose.connect(process.env.db, (error) => {
  if(error){
    console.log(error);
  } else {
    console.log('Database loaded');
  }
});

app.use('/', express.static('public'))
app.get('/chat', (req, res) => { res.sendFile(__dirname + '/public/chat.html') })

const server = app.listen(process.env.PORT, (err) => {
  if(err){
    console.log(err);
  } else {
    console.log('Server is running');
  }
})

const io = socketIo(server);

io.on('connection', (socket) => {
  modelMsg.find().then(result => {
    io.emit('output_messages', result);
  })
  
  socket.on('new_message', msg => {
    const message = new modelMsg(msg)

    message.save().then( async () => {
      await modelMsg.find().then(result => {
        io.emit('output_messages', result);
      })
    })
  })
})