# WS-RPC-MESSAGING

WS-RPC-MESSAGING package provides json-rpc 2.0 like way to real-time and bidirectional communication via websocket.
I'am trying to keep package simple and lightweight. [WS package](https://www.npmjs.com/package/ws) used in core of current package.

[![Version npm](https://img.shields.io/npm/v/ws-rpc-messaging.svg?logo=npm)](https://www.npmjs.com/package/ws-rpc-messaging)
[![Build Status](https://travis-ci.org/SeregaSE/ws-rpc-messaging.svg?branch=master)](https://travis-ci.org/SeregaSE/ws-rpc-messaging)

## LIB IN DEV

First realese (1.0.0) is planned on 01.03.2020

TO DO:

* write tests
* better doc

TO DO FEATURES:

* bulk messaging

## Table of contents

* [How to use](#installing)
* [How to use](#examples)
* [Server](#class-websocketserver)
  * [request event](#event-request)
  * [error event](#event-error)
* [Node client](#class-websocket)
  * [recieve-error event](#event-client-error)
  * [request event](#event-client-request)
  * [notify](#clientnotifymethod-params)
  * [request](#clientrequestmethod-params-promise)
  * [respond](#clientrespondid-result)
  * [throw](#clientthrowid-error)
* [Browser client](#class-browserwebsocket)
* [Broadcast](#broadcast)
* [Usefull links](#usefull-links)

## Installing

using nodejs

`npm install --save ws-rpc-messaging`

using CDN

`<script src="https://unpkg.com/ws-rpc-messaging/lib/ws-rpc-messaging.js"></script>`

`<script src="https://unpkg.com/ws-rpc-messaging/lib/ws-rpc-messaging.min.js"></script>`

## Examples

For working examples and details [see examples](/examples)

## API

### Class: WebSocket.Server

WebSocket.Server class is built using [WebSocket.Server from ws package](https://github.com/websockets/ws/blob/master/doc/ws.md#class-websocketserver). It has the same constructor.

WebSocket.Server proxy next properties and methods to [WebSocket.Server](https://github.com/websockets/ws/blob/master/doc/ws.md#class-websocketserver):

* [new WebSocket.Server(options[, callback])](https://github.com/websockets/ws/blob/master/doc/ws.md#new-websocketserveroptions-callback)
* [Event: 'close'](https://github.com/websockets/ws/blob/master/doc/ws.md#event-close)
* [Event: 'error'](https://github.com/websockets/ws/blob/master/doc/ws.md#event-error)
* [Event: 'headers'](https://github.com/websockets/ws/blob/master/doc/ws.md#event-headers)
* [Event: 'listening'](https://github.com/websockets/ws/blob/master/doc/ws.md#event-listening)
* [server.address()](https://github.com/websockets/ws/blob/master/doc/ws.md#serveraddress)
* [server.close([callback])](https://github.com/websockets/ws/blob/master/doc/ws.md#serverclosecallback)
* [server.handleUpgrade(request, socket, head, callback)](https://github.com/websockets/ws/blob/master/doc/ws.md#serverhandleupgraderequest-socket-head-callback)
* [server.shouldHandle(request)](https://github.com/websockets/ws/blob/master/doc/ws.md#servershouldhandlerequest)

#### Event: 'request'

* request {Object}  json-rpc 2.0 Request object
* client  {Client}, []instanceof WebSocket class from this package
* server  {Client}, instanceof WebSocket.server from this package

#### Event: 'error'

* error  {Error}
* client {Client}, sender
* server {Server}, self-link for server

Emitted when an error occurs on the underlying server. For example can't parse incoming message.

```js
const WebSocket = require('ws-rpc-messaging')

const server = new WebSocket.Server({ port: 3000 });

const fns = {
    sum: (...args) => args.reduce((acc, n) => acc + n, 0),
    sub: (...args) => args.slice(1).reduce((acc, n) => acc - n, args[0]),
};

/**
 * You can use routing or write any logic you want here...
 * Just don't forget to send response or error if request.id !== undefined
 */
server.on('request', (request, client) => {
    const fn = fns[request.method];

    if (fn) {
        const result = fn(...request.params);
        /** request.id is important!!! */
        client.respond(request.id, result);

        return;
    }

    /** throw not found error if have request id, it's not notification request */
    if (request.id) {
        client.throwNotFound(request.id, `method ${request.method} not found`);
    }
});
```

### Class: WebSocket

WebSocket class is built using [WebSocket from ws package](https://github.com/websockets/ws/blob/master/doc/ws.md#class-websocket). It has the same constructor.

WebSocket proxy all properties and methods to [WebSocket.Server](https://github.com/websockets/ws/blob/master/doc/ws.md#class-websocket). (exclude rarely used properties, but also available `WebSocket.ws[any_real_prop]`)

#### Event (client): 'error'

* error  {Error}
* client {Client}, self-link for client

Emitted when can't parse recieved message

#### Event (client): 'request'

* request {Object} json-rpc 2.0 Request object
* client  {Client}, self-link for client

#### client.notify(method, params)

* method {String} json-rpc 2.0 method
* params {Object} json-rpc 2.0 params

Send notification message to reciever. Reciever emit 'request' event.

Notification DO NOT expect to have a response!

#### client.request(method, params) Promise

* method {String} json-rpc 2.0 method
* params {Object} json-rpc 2.0 params

Send request message to reciever. Reciever emit 'request' event. Return promise which will be resolved with JSON-RPC 2.0 RESPONSE object or rejected with JSON-RPC 2.0 ERROR object.

#### client.respond(id, result)

* id     {String} json-rpc 2.0 request id, (string, int, null)
* result {Object} json-rpc 2.0 result

Send response message to request sender. Resolve Promise returned by the Client.request with the same id as in request.

#### client.throw(id, error)

* id    {String} json-rpc 2.0 request id, (string, int, null)
* error {Object} json-rpc 2.0 error

Send error message to request sender. Reject Promise returned by the Client.request with the same id as in request.

Other helpers to respond with errors

* throwRPCError(id, code number, message string, data string)
* throwParseError(id, data string)
* throwInvalidRequest(id, data string)
* throwNotFound(id, data string)
* throwInvalidParams(id, data string)
* throwInternalError(id, data string)

```js
const WebSocket = require('ws-rpc-messaging')

const ws = new WebSocket('ws://localhost:3000');

ws.on('open', () => {
    ws.request('sum', [1, 3, 5])
        .then(console.log) // 9
        .catch(console.error);

    ws.request('sub', [10, 2, 3])
        .then(console.log) // 5
        .catch(console.error);

    ws.request('multiply', [2, 2, 3])
        .then(console.log)
        .catch(console.error); // not found
});
```

### Class BrowserWebSocket

BrowserWebSocket class is build using native WebSocket.

API is the same as [Class: WebSocket](#class-websocket)

```html
<script src="https://unpkg.com/ws-rpc-messaging/lib/ws-rpc-messaging.min.js" type="text/javascript"></script>

<script type="text/javascript">
    const ws = new WebSocket('ws://localhost:3000');

    ws.on('open', () => {
        ws.request('sum', [1, 3, 5])
            .then(console.log) // 9
            .catch(console.error);

        ws.request('sub', [10, 2, 3])
            .then(console.log) // 5
            .catch(console.error);

        ws.request('multiply', [2, 2, 3])
            .then(console.log)
            .catch(console.error); // not found
    });
</script>
```

### Broadcast

For more information check https://github.com/websockets/ws#server-broadcast

```js
const WebSocket = require('ws-rpc-messaging')

const server = new WebSocket.Server({ port: 3000 });

server.on('request', (request, origin, self) => {
    self.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.notify('to.something', { data: 'important message' });
        }
    });
})
```

## Usefull links

* [ws package](https://www.npmjs.com/package/ws)
* [json-rpc 2.0 specification](https://www.jsonrpc.org/specification)
