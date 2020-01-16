const { JSONRPC_VERSION } = require('../constants')

const sendAPI = {
    _send(message) {
        this._ws.send(JSON.stringify({
            jsonrpc: JSONRPC_VERSION,
            ...message
        }))
    }
};

module.exports = sendAPI