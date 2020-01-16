const RPCError = require('./RPCError')
const { INVALID_REQUEST_ERROR } = require('../constants')

class InvalidRequestError extends RPCError {
    constructor(data) {
        super(INVALID_REQUEST_ERROR.code, INVALID_REQUEST_ERROR.message, data)
    }
}

module.exports = InvalidRequestError