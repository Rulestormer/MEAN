var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log(msg);
    io.emit('chat message', msg);
  });
});
io.on('connection', function(socket){
  io.emit('chat message', 'A user joined.');
  console.log('A user joined.');
  socket.on('disconnect', function(){
    io.emit('chat message', 'A user left.');
    console.log('A user left.');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
