const RPCError = require('./RPCError')
const { NOT_FOUND_ERROR } = require('../constants')

class NotFoundError extends RPCError {
    constructor(data) {
        super(NOT_FOUND_ERROR.code, NOT_FOUND_ERROR.message, data)
    }
}

module.exports = NotFoundError