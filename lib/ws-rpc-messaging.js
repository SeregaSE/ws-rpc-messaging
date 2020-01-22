var RPCWebSocket = (function () {
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

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
      return;
    }

    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

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
  var getRandomValues = typeof crypto != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto);

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
    var bth = byteToHex; // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4

    return [bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]]].join('');
  }

  var bytesToUuid_1 = bytesToUuid;

  function v4(options, buf, offset) {
    var i = buf && offset || 0;

    if (typeof options == 'string') {
      buf = options === 'binary' ? new Array(16) : null;
      options = null;
    }

    options = options || {};
    var rnds = options.random || (options.rng || rngBrowser)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

    rnds[6] = rnds[6] & 0x0f | 0x40;
    rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

    if (buf) {
      for (var ii = 0; ii < 16; ++ii) {
        buf[i + ii] = rnds[ii];
      }
    }

    return buf || bytesToUuid_1(rnds);
  }

  var v4_1 = v4;

  /* specification version */
  var JSONRPC_VERSION = '2.0';
  /* specification errors */

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
  /* specification message types */

  var ERROR = 'error';
  var REQUEST = 'request';
  var RESPONSE = 'response';
  var NOTIFICATION = 'notify';
  /* global */

  var DEFAULT_REQUEST_TIMEOUT_MILLISECONDS = 2500;

  var sleep = function sleep(milliseconds) {
    return new Promise(function (resolve) {
      setTimeout(resolve, milliseconds);
    });
  };

  var Message =
  /*#__PURE__*/
  function () {
    function Message(jsonrpc) {
      _classCallCheck(this, Message);

      this.jsonrpc = jsonrpc;
    }

    _createClass(Message, [{
      key: "toJSON",
      value: function toJSON() {
        return {
          jsonrpc: this.jsonrpc
        };
      }
    }]);

    return Message;
  }();

  var Notification =
  /*#__PURE__*/
  function (_Message) {
    _inherits(Notification, _Message);

    function Notification(jsonrpc, method, params) {
      var _this;

      _classCallCheck(this, Notification);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Notification).call(this, jsonrpc));
      _this.method = method;
      _this.params = params;
      return _this;
    }

    _createClass(Notification, [{
      key: "toJSON",
      value: function toJSON() {
        return _objectSpread2({}, _get(_getPrototypeOf(Notification.prototype), "toJSON", this).call(this), {
          method: this.method,
          params: this.params
        });
      }
    }]);

    return Notification;
  }(Message);

  var Request =
  /*#__PURE__*/
  function (_Notification) {
    _inherits(Request, _Notification);

    function Request(jsonrpc, method, params, id) {
      var _this;

      _classCallCheck(this, Request);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Request).call(this, jsonrpc, method, params));
      _this.id = id;
      return _this;
    }

    _createClass(Request, [{
      key: "toJSON",
      value: function toJSON() {
        return _objectSpread2({}, _get(_getPrototypeOf(Request.prototype), "toJSON", this).call(this), {
          id: this.id
        });
      }
    }]);

    return Request;
  }(Notification);

  var Response =
  /*#__PURE__*/
  function (_Message) {
    _inherits(Response, _Message);

    function Response(jsonrpc, field, value, id) {
      var _this;

      _classCallCheck(this, Response);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Response).call(this, jsonrpc));
      _this.field = field;
      _this.value = value;
      _this.id = id;
      return _this;
    }

    _createClass(Response, [{
      key: "toJSON",
      value: function toJSON() {
        var _objectSpread2$1;

        return _objectSpread2({}, _get(_getPrototypeOf(Response.prototype), "toJSON", this).call(this), (_objectSpread2$1 = {}, _defineProperty(_objectSpread2$1, this.field, this.value), _defineProperty(_objectSpread2$1, "id", this.id), _objectSpread2$1));
      }
    }]);

    return Response;
  }(Message);

  var ResponseError =
  /*#__PURE__*/
  function (_Response) {
    _inherits(ResponseError, _Response);

    function ResponseError(jsonrpc, error, id) {
      _classCallCheck(this, ResponseError);

      return _possibleConstructorReturn(this, _getPrototypeOf(ResponseError).call(this, jsonrpc, 'error', error, id));
    }

    return ResponseError;
  }(Response);

  var ResponseResult =
  /*#__PURE__*/
  function (_Response) {
    _inherits(ResponseResult, _Response);

    function ResponseResult(jsonrpc, result, id) {
      _classCallCheck(this, ResponseResult);

      return _possibleConstructorReturn(this, _getPrototypeOf(ResponseResult).call(this, jsonrpc, 'result', result, id));
    }

    return ResponseResult;
  }(Response);

  var is = function is(value, target) {
    return value === target;
  };
  var isType = function isType(value, type) {
    return is(_typeof(value), type);
  };
  var isNull = function isNull(value) {
    return value === null;
  };
  var isString = function isString(value) {
    return isType(value, 'string');
  };
  var isObject = function isObject(value) {
    return isType(value, 'object') && !isNull(value);
  };
  var isUndefined = function isUndefined(value) {
    return is(value, undefined);
  };

  var isMessage = function isMessage(data) {
    if (!isObject(data)) {
      throw new Error('message is not an object');
    }

    var jsonrpc = data.jsonrpc;

    if (!is(jsonrpc, JSONRPC_VERSION)) {
      throw new Error('jsonrpc field is not valid, 2.0 version expected');
    }

    return true;
  };

  var isId = function isId(id) {
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

  var isNotification = function isNotification(data) {
    var method = data.method,
        params = data.params;

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

  var isRequest = function isRequest(data) {
    isNotification(data);
    return isId(data.id);
  };

  var isResponseError = function isResponseError(data) {
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

  var isResponseResult = function isResponseResult(data) {
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

  var getType = function getType(message) {
    var method = message.method,
        result = message.result,
        error = message.error,
        id = message.id;

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

  var parse = function parse(message) {
    validate.message(message);
    var type = getType(message);

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
    CreateError: CreateError,
    CreateNotify: CreateNotify,
    CreateResponse: CreateResponse,
    CreateRequest: CreateRequest
  };

  var Receiver =
  /*#__PURE__*/
  function (_EventEmitter) {
    _inherits(Receiver, _EventEmitter);

    function Receiver() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, Receiver);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Receiver)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_this), "onMessage", function (string) {
        /** Debug all recieved raw data */
        // console.log('recieve', string)
        var json;

        try {
          json = JSON.parse(string);
        } catch (error) {
          _this.onMessageCatch(error);
        }

        if (!Array.isArray(json)) {
          json = [json];
        }

        json.forEach(function (data) {
          try {
            var _parse = parse(data),
                _parse2 = _slicedToArray(_parse, 2),
                type = _parse2[0],
                message = _parse2[1];
            /** Debug all recieved and sucess parsed messages */
            // console.log('recieve', emittedEvent, emittedMessage)


            _this.emit(type, message);
          } catch (error) {
            _this.onMessageCatch(error, data);
          }
        });
      });

      return _this;
    }

    _createClass(Receiver, [{
      key: "onMessageCatch",
      value: function onMessageCatch(error, data) {
        var id = null;

        try {
          if (validate.message(data) && validate.id(data.id)) {
            id = data.id;
          }
          /* eslint-disable-next-line no-empty */

        } catch (_) {}

        var message = messageFactory.CreateError(id, new ParseError(error.message));
        this.emit(ERROR, message);
      }
    }]);

    return Receiver;
  }(EventEmitter);

  var proxyEvents = ['open', 'close', 'error', 'message'];

  var RPCWebSocket =
  /*#__PURE__*/
  function (_EventEmitter) {
    _inherits(RPCWebSocket, _EventEmitter);

    function RPCWebSocket(ws) {
      var _this;

      _classCallCheck(this, RPCWebSocket);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(RPCWebSocket).call(this));

      _defineProperty(_assertThisInitialized(_this), "_onReceievError", function (message) {
        if (message.id !== null) {
          if (_this.pendings[message.id]) {
            _this.pendings[message.id].reject(message.error);

            delete _this.pendings[message.id];
          }
        } else {
          _this.emit('error', message, _assertThisInitialized(_this));
        }
      });

      _defineProperty(_assertThisInitialized(_this), "_onReceievResponse", function (message) {
        if (_this.pendings[message.id]) {
          _this.pendings[message.id].resolve(message.result);

          delete _this.pendings[message.id];
        }
      });

      _defineProperty(_assertThisInitialized(_this), "_onReceievNotify", function (message) {
        _this.emit('request', message, _assertThisInitialized(_this));
      });

      _defineProperty(_assertThisInitialized(_this), "_onReceievRequest", function (message) {
        _this.emit('request', message, _assertThisInitialized(_this));
      });

      _this.ws = ws;
      _this.pendings = {};
      _this.receiver = new Receiver();

      _this.receiver.on(ERROR, _this._onReceievError);

      _this.receiver.on(REQUEST, _this._onReceievRequest);

      _this.receiver.on(RESPONSE, _this._onReceievResponse);

      _this.receiver.on(NOTIFICATION, _this._onReceievNotify);

      _this.ws.on('message', _this.receiver.onMessage);

      return _this;
    }

    _createClass(RPCWebSocket, [{
      key: "send",
      value: function send(message) {
        /** Debug all sended data */
        // console.log(JSON.stringify(message));
        this.ws.send(JSON.stringify(message));
      }
    }, {
      key: "respond",
      value: function respond(id, result) {
        this.send(messageFactory.CreateResponse(id, result));
      }
    }, {
      key: "throw",
      value: function _throw(id, code, message, data) {
        this.throwError(id, new RPCError(code, message, data));
      }
    }, {
      key: "throwError",
      value: function throwError(id, error) {
        this.send(messageFactory.CreateError(id, error));
      }
    }, {
      key: "throwInternalError",
      value: function throwInternalError(id, data) {
        this.throwError(id, new InternalError(data));
      }
    }, {
      key: "throwInvalidParams",
      value: function throwInvalidParams(id, data) {
        this.throwError(id, new InvalidParamsError(data));
      }
    }, {
      key: "throwInvalidRequest",
      value: function throwInvalidRequest(id, data) {
        this.throwError(id, new InvalidRequestError(data));
      }
    }, {
      key: "throwNotFound",
      value: function throwNotFound(id, data) {
        this.throwError(id, new NotFoundError(data));
      }
    }, {
      key: "throwParseError",
      value: function throwParseError(id, data) {
        this.throwError(id, new ParseError(data));
      }
    }, {
      key: "notify",
      value: function notify(method, params) {
        this.send(messageFactory.CreateNotify(method, params));
      }
    }, {
      key: "request",
      value: function request(method, params) {
        var id = v4_1();
        return Promise.race([this.createRequest(id, method, params), this.createTimeout(id, DEFAULT_REQUEST_TIMEOUT_MILLISECONDS)]);
      }
    }, {
      key: "createRequest",
      value: function createRequest(id, method, params) {
        var _this2 = this;

        return new Promise(function (resolve, reject) {
          _this2.pendings[id] = {
            resolve: resolve,
            reject: reject
          };

          _this2.send(messageFactory.CreateRequest(id, method, params));
        });
      }
    }, {
      key: "createTimeout",
      value: function createTimeout(id, milliseconds) {
        var _this3 = this;

        return sleep(milliseconds).then(function () {
          _this3._onReceievError(messageFactory.CreateError(id, new InternalError('timeout')));
        });
      }
    }, {
      key: "on",
      value: function on() {
        this.addEventListener.apply(this, arguments);
      }
    }, {
      key: "remove",
      value: function remove() {
        this.removeEventListener.apply(this, arguments);
      }
    }, {
      key: "addEventListener",
      value: function addEventListener(event, handler) {
        if (proxyEvents.includes(event)) {
          this.ws.addEventListener(event, handler);
        } else {
          _get(_getPrototypeOf(RPCWebSocket.prototype), "on", this).call(this, event, handler);
        }
      }
    }, {
      key: "removeEventListener",
      value: function removeEventListener(event, handler) {
        if (proxyEvents.includes(event)) {
          this.ws.removeEventListener(event, handler);
        } else {
          _get(_getPrototypeOf(RPCWebSocket.prototype), "remove", this).call(this, event, handler);
        }
      }
    }, {
      key: "close",
      value: function close() {
        var _this$ws;

        (_this$ws = this.ws).close.apply(_this$ws, arguments);
      }
    }]);

    return RPCWebSocket;
  }(EventEmitter);

  var BrowserRPCWebSocket =
  /*#__PURE__*/
  function (_RPCWebSocket) {
    _inherits(BrowserRPCWebSocket, _RPCWebSocket);

    function BrowserRPCWebSocket() {
      _classCallCheck(this, BrowserRPCWebSocket);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _possibleConstructorReturn(this, _getPrototypeOf(BrowserRPCWebSocket).call(this, _construct(WebSocket, args)));
    }

    return BrowserRPCWebSocket;
  }(RPCWebSocket);

  return BrowserRPCWebSocket;

}());
