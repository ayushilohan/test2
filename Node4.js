// server.js
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
console.log("WS relay running on ws://0.0.0.0:8080");

wss.on('connection', function connection(ws, req) {
  ws.on('message', function incoming(msg) {
    // simple pass-through JSON or plain text
    // if UI sends {cmd:"..."} -> forward to all other clients (TV)
    try {
      var obj = JSON.parse(msg.toString());
      // broadcast object to everyone except sender
      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(obj));
        }
      });
    } catch (e) {
      // non-JSON -> broadcast as text
      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(msg.toString());
        }
      });
    }
  });

  ws.on('close', function () {});
});
