var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const db = require("./database/mongodb.json");
const http = require("http");
const mongoose = require("mongoose");

const io = require('socket.io');
const cors = require('cors');

var eventCategoryRouter = require("./modules/EventCategory/event-category.router");

var app = express();
const server = http.createServer(app);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(express.json({limit: '50mb'}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/event-category", eventCategoryRouter);

mongoose.set("strictQuery", true);
mongoose
  .connect(db.mongo.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected To database!");
  })
  .catch((err) => {
    console.log(err.message);
  });

// response for the index of the app

app.get("/", (req, res) => {
  console.log("the index of the app");
  res.json({ data: "Your data" });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
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
    }, 1000);

    // setTimeout(() => {
    //   clearInterval(responseInterval);
    // }, 10000);
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

server.listen(3080, () => {
  console.log("app is running on port 3080");
});

module.exports = app;
