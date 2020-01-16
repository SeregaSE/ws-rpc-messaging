const RPCError = require('./RPCError')
const { PARSE_ERROR } = require('../constants')

class ParseError extends RPCError {
    constructor(data) {
        super(PARSE_ERROR.code, PARSE_ERROR.message, data)
    }
}

module.exports = ParseError