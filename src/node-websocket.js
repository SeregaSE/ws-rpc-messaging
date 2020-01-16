const Reciever = require('./reciever')
const EventEmitter = require('./event-emitter')
const { errorAPI, requestAPI, responseAPI } = require('./sender-mixins')

class NodeRPCWebSocket extends EventEmitter {
    constructor(ws) {
        super()
        this._ws = ws
        this._reciever = new Reciever()
        this._ws.on('message', this._reciever.onMessage)
        this._reciever.on('error', this.__handleReceiverError)
        this._reciever.on('request', this.__handleReceiverRequest)
        this._reciever.on('response', this.__handleRecieverResponse)
        this._reciever.on('response_error', this.__handleRecieverResponseError)
    }
}

Object.assign(NodeRPCWebSocket.prototype, errorAPI, requestAPI, responseAPI);

module.exports = NodeRPCWebSocket
