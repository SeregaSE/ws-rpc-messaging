const sendAPI = require('./sendAPI')
const {
    InternalError,
    InvalidParamsError,
    InvalidRequestError,
    NotFoundError,
    ParseError,
    RPCError
} = require('../errors')

const errorAPI = {
    __proto__: sendAPI,

    throw(id, error) {
        this._send({
            id,
            error
        })
    },

    throwRPCError(id, code, message, data) {
        this.throw(id, new RPCError(code, message, data))
    },

    _throwDefaultError(id, data, Factory) {
        this.throw(id, new Factory(data))
    },

    throwParseError(id, data) {
        this._throwDefaultError(id, data, ParseError)
    },

    throwInvalidRequest(id, data) {
        this._throwDefaultError(id, data, InvalidRequestError)
    },

    throwNotFound(id, data) {
        this._throwDefaultError(id, data, NotFoundError)
    },

    throwInvalidParams(id, data) {
        this._throwDefaultError(id, data, InvalidParamsError)
    },

    throwInternalError(id, data) {
        this._throwDefaultError(id, data, InternalError)
    }
}

module.exports = errorAPI