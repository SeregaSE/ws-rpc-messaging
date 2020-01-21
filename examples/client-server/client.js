const WebSocket = require('ws')
const { Client } = require('../../lib')

const ws = new WebSocket('ws://localhost:3000')
const client = new Client(ws)

ws.on('open', () => {
    client.request('sum', [1, 3, 5])
        .then(console.log) // 9
        .catch(console.error)

    client.request('sub', [10, 2, 3])
        .then(console.log) // 5
        .catch(console.error)

    client.request('multiply', [2, 2, 3])
        .then(console.log)
        .catch(console.error) // not found
})
