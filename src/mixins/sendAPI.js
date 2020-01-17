const { JSONRPC_VERSION } = require('../constants')

const sendAPI = {
    _send(message) {
        /** Debug all sended data */
        // console.log('send', JSON.stringify({
        //     jsonrpc: JSONRPC_VERSION,
        //     ...message
        // }))

        this._ws.send(JSON.stringify({
            jsonrpc: JSONRPC_VERSION,
            ...message
        }))
    }
};

module.exports = sendAPI