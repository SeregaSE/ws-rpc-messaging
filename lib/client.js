const WS = require('ws');
const RPC = require('./rpc');

class Client extends RPC {
    constructor(...args) {
        super(new WS(...args));
    }
}

module.exports = Client;
