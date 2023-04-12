import express from 'express';
import path from 'path'
import  http  from 'http';
import { Server } from "socket.io";
import { log } from 'console';

const app = express();
const __dirname = path.resolve();

app.set('view engine', 'ejs'); 
app.use(express.static(path.join(__dirname, 'public')));


const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.render(__dirname + '/views/home.ejs', {error: false});
});

app.get('/chat', (req, res)=>{
  res.render(__dirname + '/views/index.ejs', {error: false});
})

io.on('connection', (socket) => {
  console.log('a user connected | id ' + socket.id);

  socket.on('message', (msg, name) => {
   let data = {
    senderId : socket.id,
    senderName : name,
    message  : msg
   }
   io.emit('message', data)
  });

  
  socket.on('disconnect', () => {
    console.log('A user disconnected | id ' + socket.id);
  });

});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

