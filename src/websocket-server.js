const EventEmitter = require('./event-emitter')
const NodeRPCWebSocket = require('./node-websocket')

class WebSocketServer extends EventEmitter {
    constructor(wss) {
        super()
        this._wss = wss
        this.clients = [];
        this._wss.on('connection', this.__onConnection)
    }

    __onConnection = (ws) => {
        const client = new NodeRPCWebSocket(ws)
        this.clients.push(client)
        client.on('error', this.__handleError)
        client.on('request', this.__handleRequest)
        this.emit('connection', client, this)
    }

    __handleError = (error, client) => {
        this.emit('error', error, client, this)
    }

    __handleRequest = (request, client) => {
        this.emit('request', request, client, this)
    }

    adress() {
        return this._wss.adress()
    }
}

module.exports = WebSocketServer
