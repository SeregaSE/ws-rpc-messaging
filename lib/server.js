const EventEmitter = require('events');
const WS = require('ws');
const RPC = require('./rpc');

const wssEvents = ['error', 'close', 'headers', 'listening'];

class Server extends EventEmitter {
    constructor(...args) {
        super();
        this.clients = new Set();
        this.wss = new WS.Server(...args);
        this.wss.on('connection', this.onConnection.bind(this));
        wssEvents.forEach((event) => {
            this.wss.on(event, this.onWssRestEvents(event).bind(this));
        });
    }

    onWssRestEvents(eventName) {
        return (...args) => {
            this.emit(eventName, ...args);
        };
    }

    address() {
        return this.wss.address();
    }

    close(...args) {
        this.wss.close(...args);
    }

    handleUpgrade(...args) {
        this.wss.handleUpgrade(...args);
    }

    shouldHandle(...args) {
        this.wss.shouldHandle(...args);
    }

    onConnection(ws) {
        const client = new RPC(ws);
        this.clients.add(client);

        client.on('close', () => {
            this.clients.delete(client);
        });

        this.emit('connection', client);
    }
}

module.exports = Server;
