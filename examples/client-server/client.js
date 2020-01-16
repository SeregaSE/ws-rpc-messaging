const { RPCWebSocket } = require('../../src')

const url = 'ws://localhost:8080'

const ws = new RPCWebSocket(url)

ws.on('open', () => {
    ws.rpc.request('sum', [1, 3, 5])
        .then(console.log)
        .catch(console.error)

    ws.rpc.request('sub', [10, 2, 3])
        .then(console.log)
        .catch(console.error)

    ws.rpc.request('multiply', [2, 2, 3])
        .then(console.log)
        .catch(console.error)
})
