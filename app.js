const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const clients = [];

wss.on('connection', (ws, request) => {
  // generate id
  const id = Math.random().toString(36).slice(2);
  console.log(`Client connected with id : ${id}`);
  
  // store id
  ws.id = id;
  clients[id] = ws;

  // message handler
  ws.on('message', (message) => {
    message = JSON.parse(message);

    let messageSent = false;
    wss.clients.forEach((client) => {
      if (typeof message.to == 'undefined') {
        // broadcast message
        if (client.readyState === WebSocket.OPEN) {
          client.send(message.text);
        }
      }
      else {
        // privat message
        if(client == clients[message.to]){
          client.send(message.text);
        }
      }
    });
  });

  // Handle WebSocket disconnections
  ws.on('close', () => {
    console.log('Disconnected');
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
