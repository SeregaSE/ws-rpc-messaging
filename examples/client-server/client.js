const WebSocket = require('ws')
const { Client } = require('../../src')

const ws = new WebSocket('ws://localhost:8080')
const client = new Client(ws)

ws.on('open', () => {
    client.request('sum', [1, 3, 5])
        .then(console.log)
        .catch(console.error)

    client.request('sub', [10, 2, 3])
        .then(console.log)
        .catch(console.error)

    client.request('multiply', [2, 2, 3])
        .then(console.log)
        .catch(console.error)
})
