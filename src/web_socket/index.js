"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = require("ws");
var WebSocketServer = ws_1.default.Server;
var wss = new WebSocketServer({ port: 8081, host: 'localhost' });
console.log('Websocket server started');
wss.on('connection', function (ws) {
    ws.on('message', function (message) {
        var split = message.toString().toLowerCase().split(' ');
        switch (split[0]) {
            case 'light':
                switch (split[1]) {
                    case 'on':
                        console.log('Light on');
                        break;
                    case 'off':
                        console.log('Light off');
                        break;
                    default:
                        console.log('Unknown command');
                }
                break;
            default:
                console.log('Unknown command');
        }
    });
    ws.send('Hi there, I am a WebSocket server');
});
wss.on('error', function (err) {
    console.log(err);
});
wss.on('close', function () {
    console.log('Connection closed');
});
