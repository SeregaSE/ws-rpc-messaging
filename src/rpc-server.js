import ws from 'ws';
import NodeRPCWebSocket from './node-rpc-websocket';
import EventEmitter from './event-emitter';

const proxyEvents = ['close', 'error', 'headers', 'listening'];

class RPCServer extends EventEmitter {
    constructor(...args) {
        super();
        this.clients = new Set();
        this.wss = new ws.Server(...args);
        this.wss.on('connection', this._onConnection);
    }

    on(event, handler) {
        if (proxyEvents.includes(event)) {
            this.wss.on(event, handler);
        } else {
            super.on(event, handler);
        }
    }

    remove(event, handler) {
        if (proxyEvents.includes(event)) {
            this.wss.remove(event, handler);
        } else {
            super.remove(event, handler);
        }
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

    _onConnection = (client) => {
        const rpc = new NodeRPCWebSocket(client);

        rpc.on('error', this.onClientError(rpc));

        rpc.on('request', this.onClientRequest(rpc));

        rpc.on('close', () => {
            this.clients.delete(rpc);
        });

        this.clients.add(rpc);
        this.emit('connection', rpc);
    }

    onClientError = (client) => (error) => {
        this.emit('error', error, client, this);
    }

    onClientRequest = (client) => (request) => {
        this.emit('request', request, client, this);
    }
}

export default RPCServer;
