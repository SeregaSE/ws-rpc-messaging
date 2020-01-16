const EventEmitter = require('../event-emitter')
const { ParseError } = require('../errors')
const { JSONRPC_VERSION } = require('../constants')
const { ErrorMessage, RequestMessage, ResponseMessage } = require('./messages')

class Reciever extends EventEmitter {
    constructor(ws) {
        super()
        ws.on('message', this.onMessage)
    }

    dispatchParseError = (error, id) =>{
        const parseError = ParseError(error.message)
        this.dispatch('error', new ErrorMessage(JSONRPC_VERSION, parseError, id || null))
    }

    onMessage = (message) => {
        try {
            const data = JSON.parse(message)

            if (Array.isArray(data)) {
                data.forEach(this.parseMessage)
            } else {
                this.parseMessage(data)
            }
        } catch (error) {
            this.dispatchParseError(error)
        }
    }

    parseMessage = (message) => {
        if (typeof message !== 'object') {
            return this.dispatchParseError(new Error('message must be object'))
        }

        const { jsonrpc, method, params, result, error, id } = message

        try {
            if (method !== undefined) {
                const request = new RequestMessage(jsonrpc, method, params, id)
                return this.dispatch('request', request)
            }
    
            if (result !== undefined) {
                const response = new ResponseMessage(jsonrpc, result, id)
                return this.dispatch('response', response)
            }
    
            if (error !== undefined) {
                const errorMessage = new ErrorMessage(jsonrpc, error, id)
                return this.dispatch('error', errorMessage)
            }
        } catch (error) {
            this.dispatchParseError(error, id)
            return
        }

        this.dispatchParseError(new Error('message must be object'))
    }
}

module.exports = Reciever
