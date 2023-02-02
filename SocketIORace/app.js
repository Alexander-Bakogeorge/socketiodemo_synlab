var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http = require("http");
const fs = require('fs');

const port = process.env.PORT || 4001;

var app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

let rawdata = fs.readFileSync('scores.json');
let scores = JSON.parse(rawdata)

let teamAPos = {'x':325, 'y':195};
let teamBPos = {'x':315, 'y':195};

let interval = setInterval(() => scoreSave(NaN), 10000);

io.on("connection", (socket) => {
  // Team A Controls
  socket.on("teamAUp", data => {
    teamAPos['y'] -= 1;
    content = {
      'teamAPos': teamAPos,
      'teamBPos': teamBPos,
    }
    io.emit('positionUpdate', content);
  });
  socket.on("teamADown", data => {
    teamAPos['y'] += 1;
    content = {
      'teamAPos': teamAPos,
      'teamBPos': teamBPos,
    }
    io.emit('positionUpdate', content);
  });
  socket.on("teamARight", data => {
    teamAPos['x'] += 1;
    content = {
      'teamAPos': teamAPos,
      'teamBPos': teamBPos,
    }
    io.emit('positionUpdate', content);
  });
  socket.on("teamALeft", data => {
    teamAPos['x'] -= 1;
    content = {
      'teamAPos': teamAPos,
      'teamBPos': teamBPos,
    }
    io.emit('positionUpdate', content);
  });

  // Team B Controls
  socket.on("teamBUp", data => {
    teamBPos['y'] -= 1;
    content = {
      'teamAPos': teamAPos,
      'teamBPos': teamBPos,
    }
    io.emit('positionUpdate', content);
  });
  socket.on("teamBDown", data => {
    teamBPos['y'] += 1;
    content = {
      'teamAPos': teamAPos,
      'teamBPos': teamBPos,
    }
    io.emit('positionUpdate', content);
  });
  socket.on("teamBRight", data => {
    teamBPos['x'] += 1;
    content = {
      'teamAPos': teamAPos,
      'teamBPos': teamBPos,
    }
    io.emit('positionUpdate', content);
  });
  socket.on("teamBLeft", data => {
    teamBPos['x'] -= 1;
    content = {
      'teamAPos': teamAPos,
      'teamBPos': teamBPos,
    }
    io.emit('positionUpdate', content);
  });
});

// Dump the score occasionally to allow for reloads if we crash
const scoreSave = socket => {
  content = {
    'teamAPos': teamAPos,
    'teamBPos': teamBPos,
  }
  fs.writeFile('scores.json', JSON.stringify(content), err => {
    if (err) {
      console.error(err);
    }
  });
};

server.listen(port, () => console.log(`Listening on port ${port}`));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;
