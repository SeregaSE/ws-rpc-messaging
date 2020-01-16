const {
    PARSE_ERROR,
    INVALID_REQUEST_ERROR,
    NOT_FOUND_ERROR,
    INVALID_PARAMS_ERROR,
    INTERNAL_ERROR
} = require('./constants')

class JsonRpcError extends Error {
    constructor(code, message, data) {
        super(message);
        this.code = code;
        this.data = data;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }

    toJSON() {
        return {
            code: this.code,
            data: this.data,
            message: this.message
        }
    }
}

const errors = [
    ['ParseError', PARSE_ERROR],
    ['InvalidRequest', INVALID_REQUEST_ERROR],
    ['NotFound', NOT_FOUND_ERROR],
    ['InvalidParams', INVALID_PARAMS_ERROR],
    ['InternalError', INTERNAL_ERROR],
].reduce((acc, [name, info]) => ({
    ...acc,
    [name]: (data) => new JsonRpcError(info.code, info.message, data)
}), {});

module.exports = {
    ParseError: errors.ParseError,
    InvalidRequest: errors.InvalidRequest,
    NotFound: errors.NotFound,
    InvalidParams: errors.InvalidParams,
    InternalError: errors.InternalError,
    JsonRpcError
}
