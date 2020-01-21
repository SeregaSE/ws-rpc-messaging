import { JSONRPC_VERSION } from '../constants';

class Message {
    constructor(jsonrpc) {
        this.jsonrpc = jsonrpc;
    }

    get jsonrpc() {
        return this._jsonrpc;
    }

    set jsonrpc(value) {
        if (value !== JSONRPC_VERSION) {
            throw new Error(`jsonrpc is required, ${JSONRPC_VERSION} expected`);
        }

        this._jsonrpc = value;
    }

    toJson() {
        return {
            jsonrpc: this.jsonrpc,
        };
    }
}

export default Message;
