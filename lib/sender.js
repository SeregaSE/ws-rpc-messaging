const { JSONRPC_VERSION, CONNECTING, OPEN } = require('./constants');

class Sender {
    constructor(ws) {
        this.ws = ws;
        this.pendings = [];
        this.ws.on('open', this.sendPendingMessages.bind(this));
    }

    sendPendingMessages() {
        this.pendings.forEach((message) => { this.send(message); });
    }

    send(message) {
        if (this.ws.readyState === OPEN) {
            const json = JSON.stringify({
                jsonrpc: JSONRPC_VERSION,
                ...message,
            });

            this.ws.send(json);
            return;
        }

        if (this.ws.readyState === CONNECTING) {
            this.pendings.push(message);
        }
    }
}

module.exports = Sender;
