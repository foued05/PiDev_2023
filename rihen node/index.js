const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io');

const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json({limit: '50mb'}))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });

// app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

console.log("helo")

app.get('/api/data', (req, res) => {
    console.log("return one data")
    // Handle API request and return data
    res.json({ data: 'Your data' });
});

const ioOptions = {
    cors: {
      origin: 'http://localhost:4200', // Replace with your Angular app's URL
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type'],
      credentials: true
    }
};

const socket = io(server, ioOptions);

socket.sockets.on('connection', (socket) => {
    
    console.log('A client connected');
  
    socket.on('message', (data) => {
      console.log('Received message:', data);
      
      // Handle the received message and send a response
      //socket.emit('response', 'Server received your message');
      const responseInterval = setInterval(() => {
        socket.emit('response', 'Server received your message');
      }, 2000);

      setTimeout(() => {
        clearInterval(responseInterval);
      }, 10000);
    });
  
    socket.on('disconnect', () => {
      console.log('A client disconnected');
    });
});

socket.sockets.on('connect', () => {
  console.log('Connected to the server');

  socket.emit('message', 'Hello server!');
});

socket.sockets.on('response', (data) => {
  console.log('Server responded:', data);
});

const port = 3000; // Or any other port number you prefer
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});