const { Server, OPEN } = require('../../lib');

const server = new Server({ port: 3000 });

const messages = [];

const handleNotify = ({ method, params }) => {
    if (method === 'messages.write') {
        messages.push(params.message);

        /** broadcast new message to all connected clients */
        server.clients.forEach((client) => {
            if (client.readyState === OPEN) {
                client.notify('messages.new', params);
            }
        });
    }
};

const handleConnection = (client) => {
    client.on('notify', handleNotify);
    client.notify('messages.history', { messages });
};

server.on('connection', handleConnection);
