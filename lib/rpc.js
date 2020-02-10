const EventEmitter = require('events');
const uuid = require('uuid/v4');
const Sender = require('./sender');
const Receiver = require('./receiver');

const wsEvents = ['open', 'error', 'upgrade', 'unexpected-response'];

class RPC extends EventEmitter {
    constructor(ws) {
        super();
        this.ws = ws;
        this.ws.on('close', this.onSocketClose.bind(this));
        wsEvents.forEach((event) => {
            this.ws.on(event, this.onSocketRestEvents(event).bind(this));
        });
        this.pendings = new Map();
        this.sender = new Sender(ws);
        this.receiver = new Receiver(ws);
        this.receiver.on('error', this.onError.bind(this));
        this.receiver.on('notify', this.onNotify.bind(this));
        this.receiver.on('request', this.onRequest.bind(this));
        this.receiver.on('response', this.onResponse.bind(this));
    }

    get binaryType() {
        return this.ws.binaryType;
    }

    get bufferedAmount() {
        return this.ws.bufferedAmount;
    }

    get extensions() {
        return this.ws.extensions;
    }

    get protocol() {
        return this.ws.protocol;
    }

    get readyState() {
        return this.ws.readyState;
    }

    get url() {
        return this.ws.url;
    }

    throw(id, error) {
        this.sender.send({
            id,
            error,
        });
    }

    respond(id, result) {
        this.sender.send({
            id,
            result,
        });
    }

    notify(method, params) {
        this.sender.send({
            method,
            params,
        });
    }

    request(method, params, callback) {
        const id = uuid();
        this.pendings.set(id, callback);
        this.sender.send({
            id,
            method,
            params,
        });
    }

    bulk(messages) {
        for (let i = 0; i < messages.length; i += 1) {
            const { method, params, callback } = messages[i];

            if (typeof callback === 'function') {
                this.request(method, params, callback);
            } else {
                this.notify(method, params);
            }
        }
    }

    close(...args) {
        this.ws.close(...args);
    }

    terminate(...args) {
        this.ws.terminate(...args);
    }

    onError(...args) {
        this.emit('error', ...args);
    }

    onNotify(message) {
        this.emit('notify', message, this);
    }

    onRequest(message) {
        this.emit('request', message, this);
    }

    onResponse(message) {
        const { id, error, result } = message;
        const callback = this.pendings.get(id);

        if (typeof callback === 'function') {
            this.pendings.delete(id);
            callback(error || null, result, this);
        }
    }

    onSocketClose(...args) {
        this.receiver.removeAllListeners();
        this.emit('close', ...args);
    }

    onSocketRestEvents(eventName) {
        return (...args) => {
            this.emit(eventName, ...args);
        };
    }
}

module.exports = RPC;
