const { Client } = require('../../lib');

const random = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

const pharases = {
    0: 'Hello world!',
    1: 'How are you?',
    2: 'Javascript is the best!',
    3: 'I\'am really happy to use web-sockets',
};

const createClient = (clientId) => {
    let messages = [];

    const client = new Client('ws://localhost:3000');

    client.on('open', () => {
        console.log(`client ${clientId}, connected`);
    });

    const interval = setInterval(() => {
        client.notify('messages.write', { message: pharases[random(0, 3)] });
    }, 1000 * clientId);

    client.on('notify', ({ method, params }) => {
        if (method === 'messages.history') {
            messages = params.messages;
            console.log(`client ${clientId}, messages: ${messages}`);
        }

        if (method === 'messages.new') {
            messages.push(params.message);
            console.log(`client ${clientId}, messages: ${messages}`);
        }
    });

    client.on('close', () => {
        clearInterval(interval);
    });
};

createClient(1);

createClient(2);

setTimeout(() => {
    createClient(3);
}, 3500);
