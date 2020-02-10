const Client = require('./client');
const Server = require('./server');
const {
    CONNECTING,
    OPEN,
    CLOSING,
    CLOSED,
    PARSE_ERROR,
    INVALID_REQUEST_ERROR,
    NOT_FOUND_ERROR,
    INVALID_PARAMS_ERROR,
    INTERNAL_ERROR,
} = require('./constants');

module.exports = {
    Client,
    Server,
    /* client ready states */
    CONNECTING,
    OPEN,
    CLOSING,
    CLOSED,
    /* jsonrpc 2.0 specification errors */
    PARSE_ERROR,
    INVALID_REQUEST_ERROR,
    NOT_FOUND_ERROR,
    INVALID_PARAMS_ERROR,
    INTERNAL_ERROR,
};
