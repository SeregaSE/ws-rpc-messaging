var RPCClient = (function () {
  'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

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

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  var RPCError =
  /*#__PURE__*/
  function (_Error) {
    _inherits(RPCError, _Error);

    function RPCError(code, message, data) {
      var _this;

      _classCallCheck(this, RPCError);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(RPCError).call(this, message));
      _this.code = code;
      _this.data = data;
      _this.name = _this.constructor.name;
      Error.captureStackTrace(_assertThisInitialized(_this), _this.constructor);
      return _this;
    }

    _createClass(RPCError, [{
      key: "toJSON",
      value: function toJSON() {
        return {
          code: this.code,
          data: this.data,
          message: this.message
        };
      }
    }]);

    return RPCError;
  }(_wrapNativeSuper(Error));

  var JSONRPC_VERSION = '2.0';
  var PARSE_ERROR = {
    message: 'Parse error',
    code: -32700
  };
  var INVALID_REQUEST_ERROR = {
    message: 'Invalid request',
    code: -32600
  };
  var NOT_FOUND_ERROR = {
    message: 'Method not found',
    code: -32601
  };
  var INVALID_PARAMS_ERROR = {
    message: 'Invalid params',
    code: -32602
  };
  var INTERNAL_ERROR = {
    message: 'Internal error',
    code: -32603
  };

  var InternalError =
  /*#__PURE__*/
  function (_RPCError) {
    _inherits(InternalError, _RPCError);

    function InternalError(data) {
      _classCallCheck(this, InternalError);

      return _possibleConstructorReturn(this, _getPrototypeOf(InternalError).call(this, INTERNAL_ERROR.code, INTERNAL_ERROR.message, data));
    }

    return InternalError;
  }(RPCError);

  var InvalidParamsError =
  /*#__PURE__*/
  function (_RPCError) {
    _inherits(InvalidParamsError, _RPCError);

    function InvalidParamsError(data) {
      _classCallCheck(this, InvalidParamsError);

      return _possibleConstructorReturn(this, _getPrototypeOf(InvalidParamsError).call(this, INVALID_PARAMS_ERROR.code, INVALID_PARAMS_ERROR.message, data));
    }

    return InvalidParamsError;
  }(RPCError);

  var InvalidRequestError =
  /*#__PURE__*/
  function (_RPCError) {
    _inherits(InvalidRequestError, _RPCError);

    function InvalidRequestError(data) {
      _classCallCheck(this, InvalidRequestError);

      return _possibleConstructorReturn(this, _getPrototypeOf(InvalidRequestError).call(this, INVALID_REQUEST_ERROR.code, INVALID_REQUEST_ERROR.message, data));
    }

    return InvalidRequestError;
  }(RPCError);

  var NotFoundError =
  /*#__PURE__*/
  function (_RPCError) {
    _inherits(NotFoundError, _RPCError);

    function NotFoundError(data) {
      _classCallCheck(this, NotFoundError);

      return _possibleConstructorReturn(this, _getPrototypeOf(NotFoundError).call(this, NOT_FOUND_ERROR.code, NOT_FOUND_ERROR.message, data));
    }

    return NotFoundError;
  }(RPCError);

  var ParseError =
  /*#__PURE__*/
  function (_RPCError) {
    _inherits(ParseError, _RPCError);

    function ParseError(data) {
      _classCallCheck(this, ParseError);

      return _possibleConstructorReturn(this, _getPrototypeOf(ParseError).call(this, PARSE_ERROR.code, PARSE_ERROR.message, data));
    }

    return ParseError;
  }(RPCError);

  var EventEmitter =
  /*#__PURE__*/
  function () {
    function EventEmitter() {
      _classCallCheck(this, EventEmitter);

      this._handlers = {};
    }

    _createClass(EventEmitter, [{
      key: "_has",
      value: function _has(event) {
        return Array.isArray(this._handlers[event]);
      }
    }, {
      key: "on",
      value: function on(event, handler) {
        if (!this._has(event)) {
          this._handlers[event] = [];
        }

        this._handlers[event].push(handler);
      }
    }, {
      key: "emit",
      value: function emit(event) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        if (this._has(event)) {
          this._handlers[event].forEach(function (handler) {
            handler.apply(void 0, args);
          });
        }
      }
    }, {
      key: "remove",
      value: function remove(event, handler) {
        if (this._has(event)) {
          this._handlers[event] = this._handlers[event].filter(function (it) {
            return it !== handler;
          });
        }
      }
    }]);

    return EventEmitter;
  }();

  var Message =
  /*#__PURE__*/
  function () {
    function Message(jsonrpc) {
      _classCallCheck(this, Message);

      this.jsonrpc = jsonrpc;
    }

    _createClass(Message, [{
      key: "toString",
      value: function toString() {
        return {
          jsonrpc: this.jsonrpc
        };
      }
    }, {
      key: "jsonrpc",
      get: function get() {
        return this._jsonrpc;
      },
      set: function set(value) {
        if (value !== JSONRPC_VERSION) {
          throw new Error("jsonrpc is required, ".concat(JSONRPC_VERSION, " expected"));
        }

        this._jsonrpc = value;
      }
    }]);

    return Message;
  }();

  var ErrorMessage =
  /*#__PURE__*/
  function (_Message) {
    _inherits(ErrorMessage, _Message);

    function ErrorMessage(jsonrpc, error, id) {
      var _this;

      _classCallCheck(this, ErrorMessage);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ErrorMessage).call(this, jsonrpc));
      _this.error = error;
      _this.id = id;
      return _this;
    }

    _createClass(ErrorMessage, [{
      key: "toString",
      value: function toString() {
        return _objectSpread2({}, _get(_getPrototypeOf(ErrorMessage.prototype), "toString", this).call(this), {
          error: this.error,
          id: this.id
        });
      }
    }, {
      key: "error",
      get: function get() {
        return this._error;
      },
      set: function set(value) {
        if (_typeof(value) !== 'object') {
          throw new Error("error must be object");
        }

        if (typeof value.code !== 'number') {
          throw new Error("error must has code, typeof number");
        }

        if (typeof value.message !== 'string' || value.message.length === 0) {
          throw new Error("error must has message, typeof string, not empty");
        }

        this._error = value;
      }
    }, {
      key: "id",
      get: function get() {
        return this._id;
      },
      set: function set(value) {
        if (typeof value === 'number') {
          if (Number.isInteger(value)) {
            return this._id = value;
          }

          throw new Error("id must be integer, got ".concat(value));
        }

        if (typeof value === 'string') {
          if (value.length > 0) {
            return this._id = value;
          }

          throw new Error("id must be not empty string");
        }

        if (value === null) {
          return this._id = value;
        }

        throw new Error("id must be | int | string | null");
      }
    }]);

    return ErrorMessage;
  }(Message);

  var RequestMessage =
  /*#__PURE__*/
  function (_Message) {
    _inherits(RequestMessage, _Message);

    function RequestMessage(jsonrpc, method, params, id) {
      var _this;

      _classCallCheck(this, RequestMessage);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(RequestMessage).call(this, jsonrpc));
      _this.method = method;
      _this.params = params;
      _this.id = id;
      return _this;
    }

    _createClass(RequestMessage, [{
      key: "toString",
      value: function toString() {
        return _objectSpread2({}, _get(_getPrototypeOf(RequestMessage.prototype), "toString", this).call(this), {
          method: this.method,
          params: this.params,
          id: this.id
        });
      }
    }, {
      key: "method",
      get: function get() {
        return this._method;
      },
      set: function set(value) {
        if (typeof value === 'string' && value.length > 0) {
          return this._method = value;
        }

        throw new Error("method must be not empty string");
      }
    }, {
      key: "params",
      get: function get() {
        return this._params;
      },
      set: function set(value) {
        if (value === null) {
          throw new Error("params must be ommited | array | object, got null");
        }

        if (_typeof(value) === 'object' || value === undefined) {
          return this._params = value;
        }

        throw new Error("params must be ommited | array | object");
      }
    }, {
      key: "id",
      get: function get() {
        return this._id;
      },
      set: function set(value) {
        if (typeof value === 'number') {
          if (Number.isInteger(value)) {
            return this._id = value;
          }

          throw new Error("id must be integer, got ".concat(value));
        }

        if (typeof value === 'string') {
          if (value.length > 0) {
            return this._id = value;
          }

          throw new Error("id must be not empty string");
        }

        if (value === null || value === undefined) {
          return this._id = value;
        }

        throw new Error("id must be ommited | int | string | null");
      }
    }]);

    return RequestMessage;
  }(Message);

  var ResponseMessage =
  /*#__PURE__*/
  function (_Message) {
    _inherits(ResponseMessage, _Message);

    function ResponseMessage(jsonrpc, result, id) {
      var _this;

      _classCallCheck(this, ResponseMessage);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ResponseMessage).call(this, jsonrpc));
      _this.result = result;
      _this.id = id;
      return _this;
    }

    _createClass(ResponseMessage, [{
      key: "toString",
      value: function toString() {
        return _objectSpread2({}, _get(_getPrototypeOf(ResponseMessage.prototype), "toString", this).call(this), {
          result: this.result,
          id: this.id
        });
      }
    }, {
      key: "result",
      get: function get() {
        return this._result;
      },
      set: function set(value) {
        if (value !== undefined) {
          return this._result = value;
        }

        throw new Error("result is required");
      }
    }, {
      key: "id",
      get: function get() {
        return this._id;
      },
      set: function set(value) {
        if (typeof value === 'number') {
          if (Number.isInteger(value)) {
            return this._id = value;
          }

          throw new Error("id must be integer, got ".concat(value));
        }

        if (typeof value === 'string') {
          if (value.length > 0) {
            return this._id = value;
          }

          throw new Error("id must be not empty string");
        }

        if (value === null) {
          return this._id = value;
        }

        throw new Error("id must be | int | string | null");
      }
    }]);

    return ResponseMessage;
  }(Message);

  /**
   * Events:
   * request - recieved request
   * response - recieved response
   * response_error - recieved error from another client / server (has id)
   * error - parsing error, example invalid or nonstandart json
   */

  var Reciever =
  /*#__PURE__*/
  function (_EventEmitter) {
    _inherits(Reciever, _EventEmitter);

    function Reciever() {
      var _this;

      _classCallCheck(this, Reciever);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Reciever).call(this));

      _defineProperty(_assertThisInitialized(_this), "onMessage", function (string) {
        /** Debug all recieved raw data */
        // console.log('recieve', string)
        var json = _this._toJson(string);

        var messages = _this._toMessages(json);

        messages.forEach(_this._parseMessage);
      });

      _defineProperty(_assertThisInitialized(_this), "_parseMessage", function (message) {
        if (_typeof(message) !== 'object') {
          return _this.emit('error', new ParseError("message in not an object, ".concat(_typeof(message), " recieved")));
        }

        var emittedEvent, emittedMessage;
        var jsonrpc = message.jsonrpc,
            method = message.method,
            params = message.params,
            result = message.result,
            error = message.error,
            id = message.id;

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
          return _this.emit('error', new ParseError(error.message));
        }

        if (emittedEvent && emittedMessage) {
          /** Debug all recieved and sucess parsed messages */
          // console.log('recieve', emittedEvent, emittedMessage)
          return _this.emit(emittedEvent, emittedMessage);
        }

        return _this.emit('error', new ParseError('invalid message, json-rpc 2.0 format required'));
      });

      return _this;
    }

    _createClass(Reciever, [{
      key: "_toJson",
      value: function _toJson(string) {
        try {
          return JSON.parse(string);
        } catch (error) {
          this.emit('error', new ParseError(error.message));
        }
      }
    }, {
      key: "_toMessages",
      value: function _toMessages(json) {
        if (Array.isArray(json)) {
          return json;
        }

        return [json];
      }
    }]);

    return Reciever;
  }(EventEmitter);

  var withReciever = function withReciever(ws) {
    ws._rpcreciever = new Reciever();

    ws._rpcreciever.on('error', ws.handleReceiverError.bind(ws));

    ws._rpcreciever.on('request', ws.handleReceiverRequest.bind(ws));

    ws._rpcreciever.on('response', ws.handleRecieverResponse.bind(ws));

    ws._rpcreciever.on('response_error', ws.handleRecieverResponseError.bind(ws));

    return ws;
  };

  var sendAPI = {
    _send: function _send(message) {
      /** Debug all sended data */
      // console.log('send', JSON.stringify({
      //     jsonrpc: JSONRPC_VERSION,
      //     ...message
      // }))
      this.send(JSON.stringify(_objectSpread2({
        jsonrpc: JSONRPC_VERSION
      }, message)));
    }
  };

  var _obj;
  var errorAPI = _obj = {
    __proto__: sendAPI,
    throw: function _throw(id, error) {
      _get(_getPrototypeOf(_obj), "_send", this).call(this, {
        id: id,
        error: error
      });
    },
    throwRPCError: function throwRPCError(id, code, message, data) {
      this.throw(id, new RPCError(code, message, data));
    },
    _throwDefaultError: function _throwDefaultError(id, data, Factory) {
      this.throw(id, new Factory(data));
    },
    throwParseError: function throwParseError(id, data) {
      this._throwDefaultError(id, data, ParseError);
    },
    throwInvalidRequest: function throwInvalidRequest(id, data) {
      this._throwDefaultError(id, data, InvalidRequestError);
    },
    throwNotFound: function throwNotFound(id, data) {
      this._throwDefaultError(id, data, NotFoundError);
    },
    throwInvalidParams: function throwInvalidParams(id, data) {
      this._throwDefaultError(id, data, InvalidParamsError);
    },
    throwInternalError: function throwInternalError(id, data) {
      this._throwDefaultError(id, data, InternalError);
    }
  };

  var recieveAPI = {
    handleReceiverError: function handleReceiverError(error) {
      this.emit('error', error, this);
    },
    handleReceiverRequest: function handleReceiverRequest(request) {
      this.emit('request', request, this);
    }
  };

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var rngBrowser = createCommonjsModule(function (module) {
  // Unique ID creation requires a high quality random # generator.  In the
  // browser this is a little complicated due to unknown quality of Math.random()
  // and inconsistent support for the `crypto` API.  We do the best we can via
  // feature-detection

  // getRandomValues needs to be invoked in a context where "this" is a Crypto
  // implementation. Also, find the complete implementation of crypto on IE11.
  var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                        (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

  if (getRandomValues) {
    // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
    var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

    module.exports = function whatwgRNG() {
      getRandomValues(rnds8);
      return rnds8;
    };
  } else {
    // Math.random()-based (RNG)
    //
    // If all else fails, use Math.random().  It's fast, but is of unspecified
    // quality.
    var rnds = new Array(16);

    module.exports = function mathRNG() {
      for (var i = 0, r; i < 16; i++) {
        if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
        rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
      }

      return rnds;
    };
  }
  });

  /**
   * Convert array of 16 byte values to UUID string format of the form:
   * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
   */
  var byteToHex = [];
  for (var i = 0; i < 256; ++i) {
    byteToHex[i] = (i + 0x100).toString(16).substr(1);
  }

  function bytesToUuid(buf, offset) {
    var i = offset || 0;
    var bth = byteToHex;
    // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
    return ([
      bth[buf[i++]], bth[buf[i++]],
      bth[buf[i++]], bth[buf[i++]], '-',
      bth[buf[i++]], bth[buf[i++]], '-',
      bth[buf[i++]], bth[buf[i++]], '-',
      bth[buf[i++]], bth[buf[i++]], '-',
      bth[buf[i++]], bth[buf[i++]],
      bth[buf[i++]], bth[buf[i++]],
      bth[buf[i++]], bth[buf[i++]]
    ]).join('');
  }

  var bytesToUuid_1 = bytesToUuid;

  function v4(options, buf, offset) {
    var i = buf && offset || 0;

    if (typeof(options) == 'string') {
      buf = options === 'binary' ? new Array(16) : null;
      options = null;
    }
    options = options || {};

    var rnds = options.random || (options.rng || rngBrowser)();

    // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
    rnds[6] = (rnds[6] & 0x0f) | 0x40;
    rnds[8] = (rnds[8] & 0x3f) | 0x80;

    // Copy bytes to buffer, if provided
    if (buf) {
      for (var ii = 0; ii < 16; ++ii) {
        buf[i + ii] = rnds[ii];
      }
    }

    return buf || bytesToUuid_1(rnds);
  }

  var v4_1 = v4;

  var _obj$1;
  var requestAPI = _obj$1 = {
    __proto__: sendAPI,
    notify: function notify(method, params) {
      _get(_getPrototypeOf(_obj$1), "_send", this).call(this, {
        method: method,
        params: params
      });
    },
    request: function request(method, params) {
      var _this = this;

      if (_typeof(this._pendings) !== 'object') {
        this._pendings = {};
      }

      var id = v4_1();
      return new Promise(function (resolve, reject) {
        _this._pendings[id] = {
          resolve: resolve,
          reject: reject
        };

        _get(_getPrototypeOf(_obj$1), "_send", _this).call(_this, {
          method: method,
          params: params,
          id: id
        });
      });
    },
    handleRecieverResponse: function handleRecieverResponse(message) {
      if (this._hasRequest(message.id)) {
        this._pendings[message.id].resolve(message.result);

        this._deleteRequest(message.id);
      }
    },
    handleRecieverResponseError: function handleRecieverResponseError(message) {
      if (this._hasRequest(message.id)) {
        this._pendings[message.id].reject(message.error);

        this._deleteRequest(message.id);
      }
    },
    _hasRequest: function _hasRequest(id) {
      return _typeof(this._pendings) === 'object' && this._pendings[id];
    },
    _deleteRequest: function _deleteRequest(id) {
      if (this._hasRequest(id)) {
        delete this._pendings[id];
      }
    }
  };

  var _obj$2;
  var responseAPI = _obj$2 = {
    __proto__: sendAPI,
    respond: function respond(id, result) {
      _get(_getPrototypeOf(_obj$2), "_send", this).call(this, {
        id: id,
        result: result
      });
    }
  };

  var withRPC = function withRPC(ws) {
    var overrides = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    Object.assign(ws.__proto__, errorAPI, recieveAPI, requestAPI, responseAPI, overrides);
    withReciever(ws);
    ws.onmessage = ws.__onMessage;
    return ws;
  };

  var withBrowserRPC = function withBrowserRPC(ws) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    withRPC.apply(void 0, [ws].concat(args));

    ws.onmessage = function (event) {
      ws._rpcreciever.onMessage(event.data);
    };

    return ws;
  };

  var RPCWebSocket =
  /*#__PURE__*/
  function (_WebSocket) {
    _inherits(RPCWebSocket, _WebSocket);

    function RPCWebSocket() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, RPCWebSocket);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(RPCWebSocket)).call.apply(_getPrototypeOf2, [this].concat(args)));
      withBrowserRPC(_assertThisInitialized(_this));
      return _this;
    }

    return RPCWebSocket;
  }(_wrapNativeSuper(WebSocket));

  return RPCWebSocket;

}());
