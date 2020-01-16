
const WebSocket = require('ws');
const { Server } = require('../src')

const wss = new WebSocket.Server({ port: 8080 });
const rpc = new Server(wss)

let balance = 0;
console.log('balance: ', balance)

rpc.on('request', (request, origin, server) => {
    switch (request.method) {
        case 'balance.get': {
            origin.rpc.response({ balance }, request.id)
            break;
        }
        case 'balance.add': {
            balance += request.params.amount
            console.log('balance: ', balance)
            origin.rpc.response({ balance }, request.id)
            server.clients.forEach((client) => {
                if (client !== origin && client.readyState === WebSocket.OPEN) {
                    client.rpc.request('balance.update', { balance });
                }
            });
            break;
        }
    }
})

rpc.on('error', (error, origin, server) => {
    console.log('ERROR', error)
})

// client_1 --> request --> server --> |validate|(dispatch) --> client_2 (dispatch) --> response --> server
