const Reciever = require('./reciever')
const EventEmitter = require('./event-emitter')
const { errorAPI, requestAPI, responseAPI } = require('./sender-mixins')

class BrowserRPCWebSocket extends EventEmitter {
    constructor(...args) {
        super()
        this._ws = new WebSocket(...args)
        this._reciever = new Reciever()
        this.onmessage = this._reciever.onMessage
        this._reciever.on('error', this.__handleReceiverError)
        this._reciever.on('request', this.__handleReceiverRequest)
        this._reciever.on('response', this.__handleRecieverResponse)
        this._reciever.on('response_error', this.__handleRecieverResponseError)
    }

    __handleError = (message) => {
        const { id, error } = message

        if (id !== null && id !== undefined && this.pendings[id]) {
            this.pendings[id].reject(error)
        } else {
            this.emit('error', message, this.ws)
        }
    }

    __handleReceiverRequest = (request) => {
        this.emit('request', request, this)
    }

    __handleReceiverError = (error) => {
        this.emit('error', error, this)
    }

    get binaryType() {
        return this.binaryType._ws
    }

    /** Read only */
    get bufferedAmount() {
        return this.bufferedAmount._ws
    }

    /** Read only */
    get extensions() {
        return this.extensions._ws
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

    close(...args) {
        this._ws.close(...args)
    }
}

Object.assign(BrowserRPCWebSocket.prototype, errorAPI, requestAPI, responseAPI);

module.exports = BrowserRPCWebSocket
