const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

//mysql
// const mysql = require('mysql');
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'ws',
// });

// db.connect();

const clients = [];

wss.on('connection', (ws, request) => {
  // generate id
  const id = Math.random().toString(36).slice(2);
  console.log(`Client connected with id : ${id}`);
  // const url = new URL(request.url, 'ws://localhost:3000');
  // const clientId = url.searchParams.get('client-id');
  // const appId = url.searchParams.get('app-id');
  // const appChannel = url.searchParams.get('app-channel'); 

  // db.query(`SELECT * FROM users where access_key = '${clientId}'`, function(error, result, fields){
  //   console.log(error);
  //   console.log(result.length);
  // });

  // console.log(`connected with parameters : ${clientId},${appId},${appChannel}`);

  // store id
  ws.id = id;
  clients[id] = ws;

  // message handler
  ws.on('message', (message) => {
    message = JSON.parse(message);
    console.log(`Received message: ${message.text}`);

    let messageSent = false;
    wss.clients.forEach((client) => {
      if (typeof message.to != 'undefined') {
        // broadcast message
        if (client.readyState === WebSocket.OPEN) {
          client.send(message.text);
        }
      }
      else {
        // privat message
        const recipientId = message.to;
        const recipient = clients[recipientId];
        if (recipient && !messageSent) {
          messageSent = true;
          recipient.send(`From ${id}: ${message.text}`);
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
