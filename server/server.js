

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = require('./user');
const app = express();
const model = require('./model');
const Chat = model.getModel('chat');
// Chat .remove({}, (e, d) => {});  


// work with express
const server =  require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  socket.on('sendmsg', (data) => {
    const { from, to, msg } = data;
    const chatid = [from, to].sort().join('_');
    Chat.create({chatid, from, to, content: msg}, (err, doc) => {
      io.emit('recvmsg', Object.assign({}, doc._doc))
    });
  });
})

app.use(bodyParser());
app.use(cookieParser());
app.use('/user', userRouter);



server.listen(3005, () => console.log('Example app listening on port 3005!'))