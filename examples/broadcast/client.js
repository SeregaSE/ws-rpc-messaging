const WebSocket = require('ws');
const { Client } = require('../../src')

const createClient = (clientId) => {
    let balance = 0
    
    const ws = new WebSocket('ws://localhost:8080')

    ws.on('open', () => {
        console.log(`client ${clientId}, connected`)

        const client = new Client(ws)

        const api = {
            add: (amount) => client.notify('balance.add', { amount })
        };
    
        client.on('request', (request) => {
            if (request.method === 'balance.update') {
                balance = request.params.balance
                console.log(`client ${clientId}, balance: ${balance} (updated)`)
            }
        })

        setInterval(() => {
            api.add(balance % clientId === 0 ? 1 : 2)
        }, 1000 * clientId)
    })
}

createClient(1)

createClient(2)

setTimeout(() => {
    createClient(3)
}, 3500)
