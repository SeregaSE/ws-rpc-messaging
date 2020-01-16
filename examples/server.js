
const http = require('http');
const WebSocket = require('ws');
const { Server } = require('../src')

const server = http.createServer({});
const wss = new WebSocket.Server({ server });
const rpc = new Server(wss)

let balance = 0;
console.log('balance: ', balance)

rpc.on('request', (request, origin, server) => {
    switch (request.method) {
        case 'balance.get': {
            origin.rpc.respond({ balance }, request.id)
            break;
        }
        case 'balance.add': {
            balance += request.params.amount
            console.log('balance: ', balance)
            origin.rpc.respond({ balance }, request.id)

            server.clients.forEach((client) => {
                if (client !== origin && client.readyState === WebSocket.OPEN) {
                    client.rpc.request('balance.update', { balance });
                }
            });

            break;
        }
            
    }
})

rpc.on('response', (response, origin, server) => {
    console.log('RESPONSE', response)
})

rpc.on('error', (error, origin, server) => {
    console.log('ERROR', error)
})

rpc.listen(8080)

// client_1 --> request --> server --> |validate|(dispatch) --> client_2 (dispatch) --> response --> server
