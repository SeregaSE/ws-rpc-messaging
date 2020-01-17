const Reciever = require('./reciever')
const EventEmitter = require('./event-emitter')
const { errorAPI, requestAPI, responseAPI } = require('./mixins')

class RPCWebSocket extends EventEmitter {
    constructor(ws) {
        super()
        this._ws = ws
        this._reciever = new Reciever()
        this._reciever.on('error', this.__handleReceiverError)
        this._reciever.on('request', this.__handleReceiverRequest)
        this._reciever.on('response', this.__handleRecieverResponse.bind(this))
        this._reciever.on('response_error', this.__handleRecieverResponseError.bind(this))
    }

    __handleReceiverRequest = (request) => {
        this.emit('request', request, this)
    }

    __handleReceiverError = (error) => {
        this.emit('error', error, this)
    }

    get binaryType() {
        return this._ws.binaryType
    }

    /** Read only */
    get bufferedAmount() {
        return this._ws.bufferedAmount
    }

    /** Read only */
    get extensions() {
        return this._ws.extensions
    }

    get onclose() {
        return this._ws.onclose
    }

    get onerror() {
        return this._ws.onerror
    }

    get onmessage() {
        return this._ws.onmessage
    }

    get onopen() {
        return this._ws.onopen
    }

    /** Read only */
    get protocol() {
        return this._ws.protocol
    }

    /** Read only */
    get readyState() {
        return this._ws.readyState
    }

    get url() {
        return this._ws.url 
    }

    set binaryType(value) {
        this._ws.binaryType = value
    }

    set onclose(value) {
        this._ws.onclose = value
    }

    set onerror(value) {
        this._ws.onerror = value
    }

    set onmessage(value) {
        this._ws.onmessage = value
    }

    set onopen(value) {
        this._ws.onopen = value
    }

    set url(value) {
        this._ws.url = value
    }

    addEventListener(type, listener) {
        this._ws.addEventListener(type, listener)
    }
}

Object.assign(RPCWebSocket.prototype, errorAPI, requestAPI, responseAPI);

module.exports = RPCWebSocket
