const WebSocket = require('ws');
const { Client } = require('../src')

const runClient = (n) => {
    const ws = new WebSocket('ws://localhost:8080')

    let balance = 0
    
    ws.on('open', () => {
        console.log(`client ${n}, connected`)

        const client = new Client(ws)
    
        const requests = {};
        const pending = {};
    
        const api = {
            get: () => {
                const method = 'balance.get'
                const id = requests[method] ? requests[method] + 1 : 0
                requests[method] = id
                pending[id] = method
                console.log(`client ${n}, request balance.get`)
                client.ws.rpc.request(method, {}, id)
            },
    
            add: (amount) => {
                const method = 'balance.add'
                const id = requests[method] ? requests[method] + 1 : 0
                requests[method] = id
                pending[id] = method
                console.log(`client ${n}, request balance.add: +${amount}`)
                client.ws.rpc.request(method, { amount }, id)
            }
        };
    
        client.on('error', (error) => {
            console.log(`client ${n} error`, error)
        })
    
        client.on('request', (request) => {
            switch (request.method) {
                case 'balance.update':
                    balance = request.params.balance
                    console.log(`client ${n}, balance: ${balance} (updated)`)
                    break;
            }
        })
    
        client.on('response', (response) => {
            switch (pending[response.id]) {
                case 'balance.add':
                    balance = response.result.balance
                    console.log(`client ${n}, balance: ${balance} (add success)`)
                    break;
                case 'balance.get':
                    balance = response.result.balance
                    console.log(`client ${n}, balance: ${balance} (get success)`)
                    break;
            }

        })
    
        api.get()
    
        setInterval(() => {
            api.add(balance % 2 === 0 ? 3 : 2)
        }, 1000 * n)
    })
}

runClient(1)

runClient(2)

runClient(3)

setTimeout(() => {
    runClient(4)
}, 7000)
