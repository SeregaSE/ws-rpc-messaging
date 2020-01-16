const {
    ParseError,
    InvalidRequest,
    NotFound,
    InvalidParams,
    InternalError,
    JsonRpcError
} = require('./errors')
const { JSONRPC_VERSION } = require('./constants')
const { ErrorMessage, RequestMessage, ResponseMessage } = require('./messages')

class Sender {
    constructor(ws) {
        this.ws = ws
    }

    send = (message) => {
        this.ws.send(this.stringify(message))
    }

    request = (method, params, id) => {
        return this.send(new RequestMessage(
            JSONRPC_VERSION,
            method,
            params,
            id
        ))
    }

    response = (result, id = null) => {
        return this.send(new ResponseMessage(
            JSONRPC_VERSION,
            result,
            id
        ))
    }

    error = (error, id = null) => {
        return this.send(new ErrorMessage(
            JSONRPC_VERSION,
            error,
            id
        ))
    }

    /** Helpers */

    stringify = (message) => {
        return message.toString()
    }

    notify = (method, params) => {
        return this.request(method, params)
    }

    throw = (code, message, data, id = null) => {
        return this.error(new JsonRpcError(code, message, data), id)
    }

    throwParseError = (data, id) => {
        return this.error(ParseError(data), id) 
    }

    throwInvalidRequest = (data, id) => {
        return this.error(InvalidRequest(data), id) 
    }

    throwNotFound = (data, id) => {
        return this.error(NotFound(data), id) 
    }

    throwInvalidParams = (data, id) => {
        return this.error(InvalidParams(data), id) 
    }

    throwInternalError = (data, id) => {
        return this.error(InternalError(data), id)
    }

    api = () => {
        return {
            notify: this.notify,
            response: this.response,
            error: this.error,
            throw: this.throw,
            throwParseError: this.throwParseError,
            throwInvalidRequest: this.throwInvalidRequest,
            throwNotFound: this.throwNotFound,
            throwInvalidParams: this.throwInvalidParams,
            throwInternalError: this.throwInternalError,
        }
    }
}

module.exports = Sender
