'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

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

/* specification version */
const JSONRPC_VERSION = '2.0';
/* specification errors */

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
/* specification message types */

const ERROR = 'error';
const REQUEST = 'request';
const RESPONSE = 'response';
const NOTIFICATION = 'notify';
/* global */

const DEFAULT_REQUEST_TIMEOUT_MILLISECONDS = 5000;

const sleep = milliseconds => new Promise(resolve => {
  setTimeout(resolve, milliseconds);
});

class Message {
  constructor(jsonrpc) {
    this.jsonrpc = jsonrpc;
  }

  toJSON() {
    return {
      jsonrpc: this.jsonrpc
    };
  }

}

class Notification extends Message {
  constructor(jsonrpc, method, params) {
    super(jsonrpc);
    this.method = method;
    this.params = params;
  }

  toJSON() {
    return { ...super.toJSON(),
      method: this.method,
      params: this.params
    };
  }

}

class Request extends Notification {
  constructor(jsonrpc, method, params, id) {
    super(jsonrpc, method, params);
    this.id = id;
  }

  toJSON() {
    return { ...super.toJSON(),
      id: this.id
    };
  }

}

class Response extends Message {
  constructor(jsonrpc, field, value, id) {
    super(jsonrpc);
    this.field = field;
    this.value = value;
    this.id = id;
  }

  toJSON() {
    return { ...super.toJSON(),
      [this.field]: this.value,
      id: this.id
    };
  }

}

class ResponseError extends Response {
  constructor(jsonrpc, error, id) {
    super(jsonrpc, 'error', error, id);
  }

  get error() {
    return this.value;
  }

}

class ResponseResult extends Response {
  constructor(jsonrpc, result, id) {
    super(jsonrpc, 'result', result, id);
  }

  get result() {
    return this.value;
  }

}

const is = (value, target) => value === target;
const isType = (value, type) => is(typeof value, type);
const isNull = value => value === null;
const isString = value => isType(value, 'string');
const isObject = value => isType(value, 'object') && !isNull(value);
const isUndefined = value => is(value, undefined);

const isMessage = data => {
  if (!isObject(data)) {
    throw new Error('message is not an object');
  }

  const {
    jsonrpc
  } = data;

  if (!is(jsonrpc, JSONRPC_VERSION)) {
    throw new Error('jsonrpc field is not valid, 2.0 version expected');
  }

  return true;
};

const isId = id => {
  if (isString(id) && id.length > 0) {
    return true;
  }

  if (Number.isInteger(id)) {
    return true;
  }

  if (isNull(id)) {
    return true;
  }

  throw new Error('id field in not valid, expect string, int or null');
};

const isNotification = data => {
  const {
    method,
    params
  } = data;

  if (!isString(method)) {
    throw new Error('method field is not a string');
  }

  if (method.length < 1) {
    throw new Error('method field is required');
  }

  if (!isUndefined(params)) {
    if (!isObject(params) && !Array.isArray(params)) {
      throw new Error('params field in not valid, array or object expected');
    }
  }

  return true;
};

const isRequest = data => {
  isNotification(data);
  return isId(data.id);
};

const isResponseError = data => {
  isId(data.id);

  if (!isObject(data.error)) {
    throw new Error('error field is required');
  }

  if (!Number.isInteger(data.error.code)) {
    throw new Error('error.code field is required, int');
  }

  if (!isString(data.error.message)) {
    throw new Error('error.message field is required, string');
  }

  return true;
};

const isResponseResult = data => {
  isId(data.id);

  if (isUndefined(data.result)) {
    throw new Error('result field is required');
  }

  return true;
};

var validate = {
  error: isResponseError,
  message: isMessage,
  request: isRequest,
  response: isResponseResult,
  notification: isNotification
};

const getType = message => {
  const {
    method,
    result,
    error,
    id
  } = message;

  if (method && id) {
    return REQUEST;
  }

  if (method) {
    return NOTIFICATION;
  }

  if (result && id) {
    return RESPONSE;
  }

  if (error && id) {
    return ERROR;
  }

  return null;
};

const parse = message => {
  validate.message(message);
  const type = getType(message);

  switch (type) {
    case REQUEST:
      validate.request(message);
      return [type, new Request(message.jsonrpc, message.method, message.params, message.id)];

    case NOTIFICATION:
      validate.notification(message);
      return [type, new Notification(message.jsonrpc, message.method, message.params)];

    case RESPONSE:
      validate.response(message);
      return [type, new ResponseResult(message.jsonrpc, message.result, message.id)];

    case ERROR:
      validate.error(message);
      return [type, new ResponseError(message.jsonrpc, message.error, message.id)];

    default:
      throw new Error('unexpected type');
  }
};

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

function CreateError(id, error) {
  return new ResponseError(JSONRPC_VERSION, error, id);
}

function CreateNotify(method, params) {
  return new Notification(JSONRPC_VERSION, method, params);
}

function CreateRequest(id, method, params) {
  return new Request(JSONRPC_VERSION, method, params, id);
}

function CreateResponse(id, result) {
  return new ResponseResult(JSONRPC_VERSION, result, id);
}

var messageFactory = {
  CreateError,
  CreateNotify,
  CreateResponse,
  CreateRequest
};

class Receiver extends EventEmitter {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "onMessage", string => {
      /** Debug all recieved raw data */
      // console.log('recieve', string);
      let json;

      try {
        json = JSON.parse(string);
      } catch (error) {
        this.onMessageCatch(error);
        return;
      }

      if (!Array.isArray(json)) {
        json = [json];
      }

      json.forEach(data => {
        try {
          const [type, message] = parse(data);
          /** Debug all recieved and sucess parsed messages */
          // console.log('recieve', type, message);

          this.emit(type, message);
        } catch (error) {
          this.onMessageCatch(error, data);
        }
      });
    });
  }

  onMessageCatch(error, data) {
    let id = null;

    try {
      if (validate.message(data) && validate.id(data.id)) {
        id = data.id;
      }
      /* eslint-disable-next-line no-empty */

    } catch (_) {}

    const message = messageFactory.CreateError(id, new ParseError(error.message));
    this.emit(ERROR, message);
  }

}

const proxyEvents = ['open', 'close', 'message'];

class RPCWebSocket extends EventEmitter {
  constructor(ws) {
    super();

    _defineProperty(this, "_onReceievError", message => {
      if (message.id !== null) {
        if (this.pendings[message.id]) {
          this.pendings[message.id].reject(message.error);
          delete this.pendings[message.id];
        }
      } else {
        this.emit('error', message, this);
      }
    });

    _defineProperty(this, "_onWSError", error => {
      this.emit('error', error, this);
    });

    _defineProperty(this, "_onReceievResponse", message => {
      if (this.pendings[message.id]) {
        this.pendings[message.id].resolve(message.result);
        delete this.pendings[message.id];
      }
    });

    _defineProperty(this, "_onReceievNotify", message => {
      this.emit('request', message, this);
    });

    _defineProperty(this, "_onReceievRequest", message => {
      this.emit('request', message, this);
    });

    this.ws = ws;
    this.pendings = {};
    this.receiver = new Receiver();
    this.receiver.on(ERROR, this._onReceievError);
    this.receiver.on(REQUEST, this._onReceievRequest);
    this.receiver.on(RESPONSE, this._onReceievResponse);
    this.receiver.on(NOTIFICATION, this._onReceievNotify);
    this.ws.on('error', this._onWSError);
    this.ws.on('message', this.receiver.onMessage);
  }

  get readyState() {
    return this.ws.readyState;
  }

  send(message) {
    /** Debug all sended data */
    // console.log('send', JSON.stringify(message));
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

  throwInternalError(id, data) {
    this.throwError(id, new InternalError(data));
  }

  throwInvalidParams(id, data) {
    this.throwError(id, new InvalidParamsError(data));
  }

  throwInvalidRequest(id, data) {
    this.throwError(id, new InvalidRequestError(data));
  }

  throwNotFound(id, data) {
    this.throwError(id, new NotFoundError(data));
  }

  throwParseError(id, data) {
    this.throwError(id, new ParseError(data));
  }

  notify(method, params) {
    this.send(messageFactory.CreateNotify(method, params));
  }

  request(method, params) {
    const id = uuid();
    return Promise.race([this.createRequest(id, method, params), this.createTimeout(id, DEFAULT_REQUEST_TIMEOUT_MILLISECONDS)]);
  }

  createRequest(id, method, params) {
    return new Promise((resolve, reject) => {
      this.pendings[id] = {
        resolve,
        reject
      };
      this.send(messageFactory.CreateRequest(id, method, params));
    });
  }

  createTimeout(id, milliseconds) {
    return sleep(milliseconds).then(() => {
      this._onReceievError(messageFactory.CreateError(id, new InternalError('timeout')));
    });
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

class BrowserWebSocket extends WebSocket {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "on", (event, handler) => {
      if (event === 'message') {
        this._addOnMessageEventListener(event, handler);
      } else {
        this.addEventListener(event, handler);
      }
    });

    _defineProperty(this, "remove", (event, handler) => {
      if (event === 'message') {
        this._removeOnMessageEventListener(event);
      } else {
        this.removeEventListener(event, handler);
      }
    });

    _defineProperty(this, "_addOnMessageEventListener", (event, handler) => {
      this._onMessageEventListener = this._createOnMessageEventListener(handler);
      this.addEventListener(event, this._onMessageEventListener);
    });

    _defineProperty(this, "_removeOnMessageEventListener", event => {
      this.removeEventListener(event, this._onMessageEventListener);
    });

    _defineProperty(this, "_createOnMessageEventListener", handler => event => {
      handler(event.data);
    });
  }

}

class BrowserRPCWebSocket extends RPCWebSocket {
  constructor(...args) {
    super(new BrowserWebSocket(...args));
  }

}

module.exports = BrowserRPCWebSocket;
