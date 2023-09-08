import WebSocket from 'ws';
var WebSocketServer = WebSocket.Server
const wss = new WebSocketServer({ port: 8081, host: 'localhost' })
console.log('Websocket server started')
wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const split = message.toString().toLowerCase().split(' ');
        switch (split[0]) {
            case 'light':
                switch (split[1]) {
                    case 'on':
                        console.log('Light on')
                        break
                    case 'off':
                        console.log('Light off')
                        break
                    default:
                        console.log('Unknown command')
                }
                break
            default:
                console.log('Unknown command')

        }
    })
    ws.send('Hi there, I am a WebSocket server')
})

wss.on('error', (err) => {
    console.log(err)
})

wss.on('close', () => {
    console.log('Connection closed')
})