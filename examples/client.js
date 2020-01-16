const WebSocket = require('ws');
const { Client } = require('../src')

const runClient = (n) => {
    let balance = 0
    
    const ws = new WebSocket('ws://localhost:8080')

    ws.on('open', () => {
        console.log(`client ${n}, connected`)

        const client = new Client(ws)

        const api = {
            get: () => client.ws.rpc.request('balance.get'),
            add: (amount) => client.ws.rpc.request('balance.add', { amount })
        };
    
        client.on('error', console.log)

        client.on('request', (request) => {
            if (request.method === 'balance.update') {
                balance = request.params.balance
                console.log(`client ${n}, balance: ${balance} (updated)`)
            }
        })

        api.get()
            .then(response => {
                balance = response.balance
                console.log(`client ${n}, balance: ${balance} (get success)`)
            })
            .catch(console.log)
    
        setInterval(() => {
            api.add(balance % n === 0 ? 1 : 2)
                .then(response => {
                    balance = response.balance
                    console.log(`client ${n}, balance: ${balance} (get success)`)
                })
                .catch(console.log)
        }, 1000 * n)
    })

    ws.on('error', console.log)
}

runClient(1)

runClient(2)

setTimeout(() => {
    runClient(3)
}, 3500)
