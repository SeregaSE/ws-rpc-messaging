const JSONRPC_VERSION = '2.0'

/** WebSocket ready state constants */
const CONNECTING = 0
const OPEN = 1
const CLOSING = 2
const CLOSED = 3

/** JSON-RPC 2.0 ERRORS */
const PARSE_ERROR = { message: 'Parse error', code: -32700 }
const INVALID_REQUEST_ERROR = { message: 'Invalid request', code: -32600 }
const NOT_FOUND_ERROR = { message: 'Method not found', code: -32601 }
const INVALID_PARAMS_ERROR = { message: 'Invalid params', code: -32602 }
const INTERNAL_ERROR = { message: 'Internal error', code: -32603 }

module.exports = {
    JSONRPC_VERSION,
    PARSE_ERROR,
    INVALID_REQUEST_ERROR,
    NOT_FOUND_ERROR,
    INVALID_PARAMS_ERROR,
    INTERNAL_ERROR,
    CONNECTING,
    OPEN,
    CLOSING,
    CLOSED
}
