const RPCError = require('./RPCError')
const { INVALID_PARAMS_ERROR } = require('../constants')

class InvalidParamsError extends RPCError {
    constructor(data) {
        super(INVALID_PARAMS_ERROR.code, INVALID_PARAMS_ERROR.message, data)
    }
}

module.exports = InvalidParamsError