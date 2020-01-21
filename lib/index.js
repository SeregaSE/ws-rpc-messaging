'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var ws = _interopDefault(require('ws'));
var uuid = _interopDefault(require('uuid/v4'));

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

class RPCError extends Error {
  constructor(code, message, data) {
    super(message);
    this.code = code;
    this.data = data;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      code: this.code,
      data: this.data,
      message: this.message
    };
  }

}

const JSONRPC_VERSION = '2.0';
const PARSE_ERROR = {
  message: 'Parse error',
  code: -32700
};
const INVALID_REQUEST_ERROR = {
  message: 'Invalid request',
  code: -32600
};
const NOT_FOUND_ERROR = {
  message: 'Method not found',
  code: -32601
};
const INVALID_PARAMS_ERROR = {
  message: 'Invalid params',
  code: -32602
};
const INTERNAL_ERROR = {
  message: 'Internal error',
  code: -32603
};

class InternalError extends RPCError {
  constructor(data) {
    super(INTERNAL_ERROR.code, INTERNAL_ERROR.message, data);
  }

}

class InvalidParamsError extends RPCError {
  constructor(data) {
    super(INVALID_PARAMS_ERROR.code, INVALID_PARAMS_ERROR.message, data);
  }

}

class InvalidRequestError extends RPCError {
  constructor(data) {
    super(INVALID_REQUEST_ERROR.code, INVALID_REQUEST_ERROR.message, data);
  }

}

class NotFoundError extends RPCError {
  constructor(data) {
    super(NOT_FOUND_ERROR.code, NOT_FOUND_ERROR.message, data);
  }

}

class ParseError extends RPCError {
  constructor(data) {
    super(PARSE_ERROR.code, PARSE_ERROR.message, data);
  }

}

class EventEmitter {
  constructor() {
    this._handlers = {};
  }

  _has(event) {
    return Array.isArray(this._handlers[event]);
  }

  on(event, handler) {
    if (!this._has(event)) {
      this._handlers[event] = [];
    }

    this._handlers[event].push(handler);
  }

  emit(event, ...args) {
    if (this._has(event)) {
      this._handlers[event].forEach(handler => {
        handler(...args);
      });
    }
  }

  remove(event, handler) {
    if (this._has(event)) {
      this._handlers[event] = this._handlers[event].filter(it => it !== handler);
    }
  }

}

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

  toString() {
    return {
      jsonrpc: this.jsonrpc
    };
  }

}

class ErrorMessage extends Message {
  constructor(jsonrpc, error, id) {
    super(jsonrpc);
    this.error = error;
    this.id = id;
  }

  get error() {
    return this._error;
  }

  set error(value) {
    if (typeof value !== 'object') {
      throw new Error(`error must be object`);
    }

    if (typeof value.code !== 'number') {
      throw new Error(`error must has code, typeof number`);
    }

    if (typeof value.message !== 'string' || value.message.length === 0) {
      throw new Error(`error must has message, typeof string, not empty`);
    }

    this._error = value;
  }

  get id() {
    return this._id;
  }

  set id(value) {
    if (typeof value === 'number') {
      if (Number.isInteger(value)) {
        return this._id = value;
      }

      throw new Error(`id must be integer, got ${value}`);
    }

    if (typeof value === 'string') {
      if (value.length > 0) {
        return this._id = value;
      }

      throw new Error(`id must be not empty string`);
    }

    if (value === null) {
      return this._id = value;
    }

    throw new Error(`id must be | int | string | null`);
  }

  toString() {
    return { ...super.toString(),
      error: this.error,
      id: this.id
    };
  }

}

class RequestMessage extends Message {
  constructor(jsonrpc, method, params, id) {
    super(jsonrpc);
    this.method = method;
    this.params = params;
    this.id = id;
  }

  get method() {
    return this._method;
  }

  set method(value) {
    if (typeof value === 'string' && value.length > 0) {
      return this._method = value;
    }

    throw new Error(`method must be not empty string`);
  }

  get params() {
    return this._params;
  }

  set params(value) {
    if (value === null) {
      throw new Error(`params must be ommited | array | object, got null`);
    }

    if (typeof value === 'object' || value === undefined) {
      return this._params = value;
    }

    throw new Error(`params must be ommited | array | object`);
  }

  get id() {
    return this._id;
  }

  set id(value) {
    if (typeof value === 'number') {
      if (Number.isInteger(value)) {
        return this._id = value;
      }

      throw new Error(`id must be integer, got ${value}`);
    }

    if (typeof value === 'string') {
      if (value.length > 0) {
        return this._id = value;
      }

      throw new Error(`id must be not empty string`);
    }

    if (value === null || value === undefined) {
      return this._id = value;
    }

    throw new Error(`id must be ommited | int | string | null`);
  }

  toString() {
    return { ...super.toString(),
      method: this.method,
      params: this.params,
      id: this.id
    };
  }

}

class ResponseMessage extends Message {
  constructor(jsonrpc, result, id) {
    super(jsonrpc);
    this.result = result;
    this.id = id;
  }

  get result() {
    return this._result;
  }

  set result(value) {
    if (value !== undefined) {
      return this._result = value;
    }

    throw new Error(`result is required`);
  }

  get id() {
    return this._id;
  }

  set id(value) {
    if (typeof value === 'number') {
      if (Number.isInteger(value)) {
        return this._id = value;
      }

      throw new Error(`id must be integer, got ${value}`);
    }

    if (typeof value === 'string') {
      if (value.length > 0) {
        return this._id = value;
      }

      throw new Error(`id must be not empty string`);
    }

    if (value === null) {
      return this._id = value;
    }

    throw new Error(`id must be | int | string | null`);
  }

  toString() {
    return { ...super.toString(),
      result: this.result,
      id: this.id
    };
  }

}

/**
 * Events:
 * request - recieved request
 * response - recieved response
 * response_error - recieved error from another client / server (has id)
 * error - parsing error, example invalid or nonstandart json
 */

class Reciever extends EventEmitter {
  constructor() {
    super();

    _defineProperty(this, "onMessage", string => {
      /** Debug all recieved raw data */
      // console.log('recieve', string)
      const json = this._toJson(string);

      const messages = this._toMessages(json);

      messages.forEach(this._parseMessage);
    });

    _defineProperty(this, "_parseMessage", message => {
      if (typeof message !== 'object') {
        return this.emit('error', new ParseError(`message in not an object, ${typeof message} recieved`));
      }

      let emittedEvent, emittedMessage;
      const {
        jsonrpc,
        method,
        params,
        result,
        error,
        id
      } = message;

      try {
        if (method !== undefined) {
          emittedEvent = 'request';
          emittedMessage = new RequestMessage(jsonrpc, method, params, id);
        }

        if (result !== undefined) {
          emittedEvent = 'response';
          emittedMessage = new ResponseMessage(jsonrpc, result, id);
        }

        if (error !== undefined) {
          emittedEvent = 'response_error';
          emittedMessage = new ErrorMessage(jsonrpc, error, id);
        }
      } catch (error) {
        return this.emit('error', new ParseError(error.message));
      }

      if (emittedEvent && emittedMessage) {
        /** Debug all recieved and sucess parsed messages */
        // console.log('recieve', emittedEvent, emittedMessage)
        return this.emit(emittedEvent, emittedMessage);
      }

      return this.emit('error', new ParseError('invalid message, json-rpc 2.0 format required'));
    });
  }

  _toJson(string) {
    try {
      return JSON.parse(string);
    } catch (error) {
      this.emit('error', new ParseError(error.message));
    }
  }

  _toMessages(json) {
    if (Array.isArray(json)) {
      return json;
    }

    return [json];
  }

}

const withReciever = ws => {
  ws._rpcreciever = new Reciever();

  ws._rpcreciever.on('error', ws.handleReceiverError.bind(ws));

  ws._rpcreciever.on('request', ws.handleReceiverRequest.bind(ws));

  ws._rpcreciever.on('response', ws.handleRecieverResponse.bind(ws));

  ws._rpcreciever.on('response_error', ws.handleRecieverResponseError.bind(ws));

  return ws;
};

const sendAPI = {
  _send(message) {
    /** Debug all sended data */
    // console.log('send', JSON.stringify({
    //     jsonrpc: JSONRPC_VERSION,
    //     ...message
    // }))
    this.send(JSON.stringify({
      jsonrpc: JSONRPC_VERSION,
      ...message
    }));
  }

};

const errorAPI = {
  __proto__: sendAPI,

  throw(id, error) {
    super._send({
      id,
      error
    });
  },

  throwRPCError(id, code, message, data) {
    this.throw(id, new RPCError(code, message, data));
  },

  _throwDefaultError(id, data, Factory) {
    this.throw(id, new Factory(data));
  },

  throwParseError(id, data) {
    this._throwDefaultError(id, data, ParseError);
  },

  throwInvalidRequest(id, data) {
    this._throwDefaultError(id, data, InvalidRequestError);
  },

  throwNotFound(id, data) {
    this._throwDefaultError(id, data, NotFoundError);
  },

  throwInvalidParams(id, data) {
    this._throwDefaultError(id, data, InvalidParamsError);
  },

  throwInternalError(id, data) {
    this._throwDefaultError(id, data, InternalError);
  }

};

const recieveAPI = {
  handleReceiverError(error) {
    this.emit('recieve-error', error, this);
  },

  handleReceiverRequest(request) {
    this.emit('request', request, this);
  }

};

const requestAPI = {
  __proto__: sendAPI,

  notify(method, params) {
    super._send({
      method,
      params
    });
  },

  request(method, params) {
    if (typeof this._pendings !== 'object') {
      this._pendings = {};
    }

    const id = uuid();
    return new Promise((resolve, reject) => {
      this._pendings[id] = {
        resolve,
        reject
      };

      super._send({
        method,
        params,
        id
      });
    });
  },

  handleRecieverResponse(message) {
    if (this._hasRequest(message.id)) {
      this._pendings[message.id].resolve(message.result);

      this._deleteRequest(message.id);
    }
  },

  handleRecieverResponseError(message) {
    if (this._hasRequest(message.id)) {
      this._pendings[message.id].reject(message.error);

      this._deleteRequest(message.id);
    }
  },

  _hasRequest(id) {
    return typeof this._pendings === 'object' && this._pendings[id];
  },

  _deleteRequest(id) {
    if (this._hasRequest(id)) {
      delete this._pendings[id];
    }
  }

};

const responseAPI = {
  __proto__: sendAPI,

  respond(id, result) {
    super._send({
      id,
      result
    });
  }

};

const withRPC = (ws, overrides = {}) => {
  Object.assign(ws.__proto__, errorAPI, recieveAPI, requestAPI, responseAPI, overrides);
  withReciever(ws);
  ws.onmessage = ws.__onMessage;
  return ws;
};

const withNodeRPC = (ws, ...args) => {
  withRPC(ws, ...args);
  ws.on('message', ws._rpcreciever.onMessage);
  return ws;
};

class RPCWebSocketServer extends ws.Server {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleConnection", ws => {
      withNodeRPC(ws, {
        handleReceiverError: this.createClientReceiverErrorHandle(ws),
        handleReceiverRequest: this.createClientReceiverRequestHandle(ws)
      });
    });

    _defineProperty(this, "createClientReceiverErrorHandle", client => error => {
      this.emit('recieve-error', error, client, this);
    });

    _defineProperty(this, "createClientReceiverRequestHandle", client => request => {
      this.emit('request', request, client, this);
    });

    this.on('connection', this.handleConnection);
  }

}

class RPCWebSocket extends ws {
  constructor(...args) {
    super(...args);
    withNodeRPC(this);
  }

}

var index = {
  Server: RPCWebSocketServer,
  Client: RPCWebSocket,
  CONNECTING: ws.CONNECTING,
  OPEN: ws.OPEN,
  CLOSING: ws.CLOSING,
  CLOSED: ws.CLOSED
};

module.exports = index;
