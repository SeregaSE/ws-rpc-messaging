const { ParseError } = require('./errors')
const EventEmitter = require('./event-emitter')
const { ErrorMessage, RequestMessage, ResponseMessage } = require('./messages')

/**
 * Events:
 * request - recieved request
 * response - recieved response
 * response_error - recieved error from another client / server (has id)
 * error - parsing error, example invalid or nonstandart json
 */
class Reciever extends EventEmitter {
    constructor() {
        super()
    }

    onMessage = (string) => {
        /** Debug all recieved raw data */
        // console.log('recieve', string)
        const json = this._toJson(string)
        const messages = this._toMessages(json)
        messages.forEach(this._parseMessage)
    }

    _toJson(string) {
        try {
            return JSON.parse(string)
        } catch (error) {
            this.emit('error', new ParseError(error.message))
        }
    }

    _toMessages(json) {
        if (Array.isArray(json)) {
            return json
        }
        
        return [json]
    }

    _parseMessage = (message) => {
        if (typeof message !== 'object') {
            return this.emit('error', new ParseError(`message in not an object, ${typeof message} recieved`))
        }

        let emittedEvent, emittedMessage;
        const { jsonrpc, method, params, result, error, id } = message

        try {
            if (method !== undefined) {
                emittedEvent = 'request'
                emittedMessage = new RequestMessage(jsonrpc, method, params, id)
            }
    
            if (result !== undefined) {
                emittedEvent = 'response'
                emittedMessage = new ResponseMessage(jsonrpc, result, id)
            }
    
            if (error !== undefined) {
                emittedEvent = 'response_error'
                emittedMessage = new ErrorMessage(jsonrpc, error, id)
            }
        } catch (error) {
            return this.emit('error', new ParseError(error.message))
        }

        if (emittedEvent && emittedMessage) {
            /** Debug all recieved and sucess parsed messages */
            // console.log('recieve', emittedEvent, emittedMessage)
            return this.emit(emittedEvent, emittedMessage)
        }

        return this.emit('error', new ParseError('invalid message, json-rpc 2.0 format required'))
    }
}

module.exports = Reciever
