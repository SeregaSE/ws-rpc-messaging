# WS-RPC-MESSAGING

WS-RPC-MESSAGING package provides json-rpc 2.0 like way to real-time and bidirectional communication via websocket.
I'am trying to keep package simple and lightweight. [WS package](https://www.npmjs.com/package/ws) used in core of current package.

[![Version npm](https://img.shields.io/npm/v/ws-rpc-messaging.svg?logo=npm)](https://www.npmjs.com/package/ws-rpc-messaging)
[![Build Status](https://travis-ci.org/SeregaSE/ws-rpc-messaging.svg?branch=master)](https://travis-ci.org/SeregaSE/ws-rpc-messaging)

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

`npm install --save ws-rpc-messaging`

## Examples

For working examples and details [see examples](/examples)

## API

### Class: Server

Server class is built using [WebSocket.Server from ws package](https://github.com/websockets/ws/blob/master/doc/ws.md#class-websocketserver). It has the same constructor. Server only wraps incoming connections with rpc client api.


Server proxy all properties and methods to [WebSocket.Server](https://github.com/websockets/ws/blob/master/doc/ws.md#class-websocketserver)

Exclude `Server.clients`, returns Set of RPC Clients;

```js
const { Server, NOT_FOUND_ERROR, INTERNAL_ERROR } = require('ws-rpc-messaging');

const fns = {
    sum: (...args) => args.reduce((acc, n) => acc + n, 0),
    sub: (...args) => args.slice(1).reduce((acc, n) => acc - n, args[0]),
};

const handleRequest = ({ id, method, params }, origin) => {
    if (typeof fns[method] === 'function') {
        try {
            origin.respond(id, fns[method](...params));
        } catch (error) {
            origin.throw(id, INTERNAL_ERROR);
        }
    } else {
        origin.throw(id, NOT_FOUND_ERROR);
    }
};

const handleConnection = (client) => {
    /**
     * You can use routing or write any logic you want here...
     * Just don't forget to send response or error if request.id !== undefined
     */
    client.on('request', handleRequest);
};

const server = new Server({ port: 3000 });
server.on('connection', handleConnection);
```

### Class: Client

Client class is built using [WebSocket from ws package](https://github.com/websockets/ws/blob/master/doc/ws.md#class-websocket). It has the same constructor.

Client proxy all properties and methods to [WebSocket.Server](https://github.com/websockets/ws/blob/master/doc/ws.md#class-websocket). (exclude rarely used properties, but also available `Client.ws[any_real_prop]`)

#### Event (client): 'error'

* error  {Error}
* client {Client}, self-link for client

Emitted when can't parse received message

#### Event (client): 'request'

* request {Object} json-rpc 2.0 Request object
* client  {Client}, self-link for client

#### Event (client): 'response'

* request {Object} json-rpc 2.0 Response object
* client  {Client}, self-link for client

#### client.notify(method, params)

* method {String} json-rpc 2.0 method
* params {Object} json-rpc 2.0 params

Send notification message to receiver. Receiver emit 'notify' event.

Notification DO NOT expect to have a response!

#### client.request(method, params, callback)

* method {String} json-rpc 2.0 method
* params {Object} json-rpc 2.0 params
* callback (error, result, origin)
  * error:  json-rpc 2.0 error or null
  * result: json-rpc 2.0 result or undefined
  * origin: self-link for client

Send request message to receiver. Receiver emit 'request' event. Callback will be fired with JSON-RPC 2.0 RESPONSE object and null error or with JSON-RPC 2.0 ERROR object.

#### client.bulk(messages)

* messages {Array} of notify `{ method, params }` or request `{ method, params, callback }` objects.

Send many requests and notifications to receiver. Receiver handle every message independently and send response if callback provided.

#### client.respond(id, result)

* id     {String} json-rpc 2.0 request id, (string, int, null)
* result {Object} json-rpc 2.0 result

Send response message to request sender. Fires callback provided by the Client.request with the same id as in request.

#### client.throw(id, error)

* id    {String} json-rpc 2.0 request id, (string, int, null)
* error {Object} json-rpc 2.0 error

Send error message to request sender. Fires callback provided by the Client.request with the same id as in request.

```js
const { Client } = require('ws-rpc-messaging');

const client = new Client('ws://localhost:3000');

client.on('open', () => {
    client.request('sum', [1, 3, 5], (err, res) => {
        console.log(err, res);
    });

    client.request('sub', [10, 2, 3], (err, res) => {
        console.log(err, res);
    });

    client.request('multiply', [2, 2, 3], (err, res) => {
        console.log(err, res);
    });
});
```

### Broadcast

For more information check https://github.com/websockets/ws#server-broadcast

```js
const { Server, OPEN } = require('ws-rpc-messaging');

const server = new Server({ port: 3000 });

const messages = [];

const handleNotify = ({ method, params }) => {
    if (method === 'messages.write') {
        messages.push(params.message);

        /** broadcast new message to all connected clients */
        server.clients.forEach((client) => {
            if (client.readyState === OPEN) {
                client.notify('messages.new', params);
            }
        });
    }
};
```

## Usefull links

* [ws package](https://www.npmjs.com/package/ws)
* [json-rpc 2.0 specification](https://www.jsonrpc.org/specification)
