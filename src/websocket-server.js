const EventEmitter = require('./event-emitter')
const NodeRPCWebSocket = require('./node-websocket')

class WebSocketServer extends EventEmitter {
    constructor(wss) {
        super()
        this._wss = wss
        this._wss.on('connection', this.__onConnection)
    }

    __onConnection = (ws) => {
        const client = new NodeRPCWebSocket(ws)
        client.on('error', this.__handleError)
        client.on('request', this.__handleRequest)
    }

    __handleError = (error, client) => {
        this.emit('error', error, client, this._wss)
    }

    __handleRequest = (request, client) => {
        this.emit('request', request, client, this._wss)
    }
}

module.exports = WebSocketServer
