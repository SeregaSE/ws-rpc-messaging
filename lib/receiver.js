const EventEmitter = require('events');
const {
    PARSE_ERROR,
    JSONRPC_VERSION,
} = require('./constants');

class Receiver extends EventEmitter {
    constructor(ws) {
        super();
        this.ws = ws;
        this.ws.on('message', this.onMessage.bind(this));
    }

    onMessage(data) {
        let messages;

        try {
            messages = JSON.parse(data);
        } catch (error) {
            this.emit('error', error);
            return;
        }

        if (!Array.isArray(messages)) {
            messages = [messages];
        }

        for (let i = 0; i < messages.length; i += 1) {
            const message = messages[i];

            if (message && message.jsonrpc === JSONRPC_VERSION) {
                if (message.method && message.id) {
                    this.emit('request', message);
                    continue;
                }

                if (message.method) {
                    this.emit('notify', message);
                    continue;
                }

                if (message.error || message.result) {
                    this.emit('response', message);
                    continue;
                }
            }

            this.emit('error', new Error(PARSE_ERROR.message));
        }
    }
}

module.exports = Receiver;
