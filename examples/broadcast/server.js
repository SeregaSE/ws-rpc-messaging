const { Server, OPEN } = require('../../lib')

const rpc = new Server({ port: 3000 })

let balance = 0;

rpc.on('connection', client => {
    client.request('balance.update', { balance })
})

rpc.on('request', (request, origin, server) => {
    if (request.method === 'balance.add') {
        balance += request.params.amount
        
        /** broadcast balance update to all connected clients */
        server.clients.forEach((client) => {
            if (client.readyState === OPEN) {
                client.notify('balance.update', { balance });
            }
        });

        return
    }

    /** throw not found error if have request id, it's not notification request */
    if (request.id) {
        origin.throwNotFound(request.id, `method ${request.method} not found`)
    }
})
