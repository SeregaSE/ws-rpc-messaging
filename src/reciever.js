const EventEmitter = require('./event-emitter')
const { ParseError } = require('./errors')
const { JSONRPC_VERSION } = require('./constants')
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

    onMessage = (data) => {
        const messages = this.parseData(data)

        if (Array.isArray(messages)) {
            messages.forEach(this.parseMessage)
        } else {
            this.parseMessage(messages)
        }
    }

    parseData = (data) => {
        try {
            return JSON.parse(data)
        } catch (error) {
            this.dispatchParseError(error)
        }
    }

    parseMessage = (message) => {
        if (typeof message !== 'object') {
            return this.dispatchParseError(new Error('message must be object'))
        }

        const { jsonrpc, method, params, result, error, id } = message

        let eventName, eventValue

        try {
            if (method !== undefined) {
                eventValue = new RequestMessage(jsonrpc, method, params, id)
                eventName = 'request'
            }
    
            if (result !== undefined) {
                eventValue = new ResponseMessage(jsonrpc, result, id)
                eventName = 'response'
            }
    
            if (error !== undefined) {
                eventValue = new ErrorMessage(jsonrpc, error, id)
                eventName = 'error'

            }
        } catch (error) {
            this.dispatchParseError(error, id)
            return
        }

        if (eventName && eventValue) {
            return this.dispatch(eventName, eventValue)
        }

        this.dispatchParseError(new Error('message must be object'))
    }
}

module.exports = Reciever
