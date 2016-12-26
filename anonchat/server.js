// NPM Plugins
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Helpers
function getZeit(){
  return '[' + new Date().toLocaleTimeString('de-DE', { 
                                            hour: "numeric", 
                                            minute: "numeric",
                                            second: "numeric" }) + ']  ';
}

// REST
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/anonchat', function(req, res){
  res.sendFile(__dirname + '/anonchat.html');
});

io.on('connection', function(socket){
  io.emit('chat message', getZeit() + 'A user joined.');
  console.log('A user joined.');

  socket.on('disconnect', function(){
    io.emit('chat message', getZeit() + 'A user left.');
    console.log('A user left.');
  });

  socket.on('chat message', function(msg){
    console.log(msg);
    io.emit('chat message', getZeit() + msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
