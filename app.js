const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

function URLToArray(url) {
  var request = {};
  var pairs = url.substring(url.indexOf('?') + 1).split('&');
  for (var i = 0; i < pairs.length; i++) {
      if(!pairs[i])
          continue;
      var pair = pairs[i].split('=');
      request[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
   }
   return request;
}

wss.on('connection', (ws, request) => {
  // generate id
  const param = URLToArray(request.url);
  // const header = ws.upgradeReq.headers;
  const id = param['client-id'];
  const app_name = param['app'];
  console.log(`Client connected with id : ${id}`);
  // console.log(request);
  
  // store id
  ws.id = id;
  // console.log(apps);
  if(!wss.clients.hasOwnProperty(app_name)){
    wss.clients[app_name] = {
      clients : [],
    }
  }
  wss.clients[app_name].clients.push(ws);
  // console.log(apps);
  // clients[id] = ws;

  // message handler
  ws.on('message', (message) => {
    message = JSON.parse(message);

    let messageSent = false;
    wss.clients[app_name].clients.forEach((client) => {
      if (typeof message.to == 'undefined') {
        // broadcast message
        if (client.readyState === WebSocket.OPEN) {
          client.send(message.text);
        }
      }
      else {
        // privat message
        if(client.id == message.to){
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
