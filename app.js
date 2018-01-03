let http = require('http');
let express = require('express');
let io = require('socket.io');
let five = require('johnny-five');

let board = new five.Board();
let app = new express();

let port = 3000;

app.use(express.static(__dirname + '/public'));

board.on('ready', function(){
  console.log('ARDUINO BOARD READY STATE: TRUE');
  // button code to be inserted here
  // toggle() a LED from both web and physical button

  let proximity = new five.Proximity({
    controller: "HCSR04",
    pin: 7
  });

  proximity.on("change", function() {
    io.emit('data', proximity.cm);
  });
});

let server = http.createServer(app).listen(port, function(req, res){
  console.log('LISTENING ON PORT ' + port);
});

io = io.listen(server);

io.on('connection', function(socket){
  console.log('SOCKET.IO CONNECTED');

  socket.on('disconnect', function(){
    console.log('SOCKET.IO DISCONNECTED');
  })
});


