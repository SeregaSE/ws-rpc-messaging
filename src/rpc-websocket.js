import uuid from 'uuid/v4';
import {
    ERROR,
    REQUEST,
    RESPONSE,
    NOTIFICATION,
    DEFAULT_REQUEST_TIMEOUT_MILLISECONDS,
} from './constants';
import sleep from './sleep';
import Receiver from './receiver';
import EventEmitter from './event-emitter';
import messageFactory from './message-factory';
import { RPCError, InternalError } from './errors';

const proxyEvents = ['open', 'close', 'error', 'message'];

class RPCWebSocket extends EventEmitter {
    constructor(ws) {
        super();
        this.ws = ws;
        this.pendings = {};
        this.receiver = new Receiver();
        this.receiver.on(ERROR, this._onReceievError);
        this.receiver.on(REQUEST, this._onReceievRequest);
        this.receiver.on(RESPONSE, this._onReceievResponse);
        this.receiver.on(NOTIFICATION, this._onReceievNotify);
        this.ws.on('message', this.receiver.onMessage);
    }

    send(message) {
        /** Debug all sended data */
        // console.log(JSON.stringify(message));
        this.ws.send(JSON.stringify(message));
    }

    respond(id, result) {
        this.send(messageFactory.CreateResponse(id, result));
    }

    throw(id, code, message, data) {
        this.throwError(id, new RPCError(code, message, data));
    }

    throwError(id, error) {
        this.send(messageFactory.CreateError(id, error));
    }

    notify(method, params) {
        this.send(messageFactory.CreateNotify(method, params));
    }

    request(method, params) {
        const id = uuid();

        return Promise.race([
            this.createRequest(id, method, params),
            this.createTimeout(id, DEFAULT_REQUEST_TIMEOUT_MILLISECONDS),
        ]);
    }

    createRequest(id, method, params) {
        return new Promise((resolve, reject) => {
            this.pendings[id] = {
                resolve,
                reject,
            };

            this.send(messageFactory.CreateRequest(id, method, params));
        });
    }

    createTimeout(id, milliseconds) {
        return sleep(milliseconds).then(() => {
            this._onReceievError(messageFactory.CreateError(id, new InternalError('timeout')));
        });
    }

    _onReceievError = (message) => {
        if (message.id !== null) {
            if (this.pendings[message.id]) {
                this.pendings[message.id].reject(message.error);
                delete this.pendings[message.id];
            }
        } else {
            this.emit('error', message, this);
        }
    }

    _onReceievResponse = (message) => {
        if (this.pendings[message.id]) {
            this.pendings[message.id].resolve(message.result);
            delete this.pendings[message.id];
        }
    }

    /* if change event to notication, it will be simple to separate incoming requests by type */
    _onReceievNotify = (message) => {
        this.emit('request', message, this);
    }

    _onReceievRequest = (message) => {
        this.emit('request', message, this);
    }

    on(...args) {
        this.addEventListener(...args);
    }

    remove(...args) {
        this.removeEventListener(...args);
    }

    addEventListener(event, handler) {
        if (proxyEvents.includes(event)) {
            this.ws.addEventListener(event, handler);
        } else {
            super.on(event, handler);
        }
    }

    removeEventListener(event, handler) {
        if (proxyEvents.includes(event)) {
            this.ws.removeEventListener(event, handler);
        } else {
            super.remove(event, handler);
        }
    }

    close(...args) {
        this.ws.close(...args);
    }
}

export default RPCWebSocket;
