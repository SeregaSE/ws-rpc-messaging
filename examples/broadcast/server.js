const WebSocket = require('../../lib');

const server = new WebSocket.Server({ port: 3000 });

let balance = 0;

server.on('connection', (client) => {
    client.request('balance.update', { balance })
        .catch(console.error); // timeout because clients do not respond
});

server.on('request', (request, origin, self) => {
    if (request.method === 'balance.add') {
        balance += request.params.amount;

        /** broadcast balance update to all connected clients */
        self.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.notify('balance.update', { balance });
            }
        });

        return;
    }

    /** throw not found error if have request id, it's not notification request */
    if (request.id) {
        origin.throwNotFound(request.id, `method ${request.method} not found`);
    }
});
