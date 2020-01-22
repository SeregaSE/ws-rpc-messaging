const WebSocket = require('../../lib');

const createClient = (clientId) => {
    let balance = 0;

    const client = new WebSocket('ws://localhost:3000');

    const api = {
        add: (amount) => client.notify('balance.add', { amount }),
    };

    client.on('open', () => {
        console.log(`client ${clientId}, connected`);

        setInterval(() => {
            api.add(balance % clientId === 0 ? 1 : 2);
        }, 1000 * clientId);
    });

    client.on('request', (request) => {
        if (request.method === 'balance.update') {
            balance = request.params.balance;
            console.log(`client ${clientId}, balance: ${balance} (updated)`);
        }
    });
};

createClient(1);

createClient(2);

setTimeout(() => {
    createClient(3);
}, 3500);
