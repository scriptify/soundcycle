const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

function createServer({ port }) {
  // Server should save actions: When a new client connects, all
  // actions can be executed on it, so it's in sync with the rest
  const actions = [];

  app.get('/', (req, res) => {
    res.send(`<p>Controller server started! Open the loopstation on your controlling device by appending /#controller</p>`);
  });

  io.on('connection', (socket) => {
    // Initialize with action
    actions.forEach(a => socket.emit(`action`, a));

    socket.on(`action`, (data) => {
      actions.push(data);
      socket.broadcast.emit(`action`, data);
    });
  });

  http.listen(port, function(){
    console.log(`Listening on ${port}`);
  });
}

module.exports = createServer;
