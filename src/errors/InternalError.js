const RPCError = require('./RPCError')
const { INTERNAL_ERROR } = require('../constants')

class InternalError extends RPCError {
    constructor(data) {
        super(INTERNAL_ERROR.code, INTERNAL_ERROR.message, data)
    }
}

module.exports = InternalError