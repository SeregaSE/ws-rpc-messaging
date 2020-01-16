const { JSONRPC_VERSION } = require('../constants')

class Message {
    constructor(jsonrpc) {
        this.jsonrpc = jsonrpc
    }

    get jsonrpc() {
        return this._jsonrpc
    }

    set jsonrpc(value) {
        if (value !== JSONRPC_VERSION) {
            throw new Error(`jsonrpc is required, ${JSONRPC_VERSION} expected`)
        }

        this._jsonrpc = value
    }

    toString() {
        return {
            jsonrpc: this.jsonrpc
        }
    }
}

module.exports = Message
