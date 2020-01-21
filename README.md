# LIB IN DEV

First realese (1.0.0) is planned on 15.02.2020

TO DO:

* write tests, set up ci/cd (mb travis)
* bulk messaging
* optimize build, make cjs for node, iife for cdn, cjs for frontend build systems

## Installing

using nodejs

`npm install --save ws-rpc-messaging`

`const { Server, Client } = require('ws-rpc-messaging')`

using CDN

`<script src="https://unpkg.com/ws-rpc-messaging@0.0.5/lib/ws-rpc-messaging.js"></script>`

`<script src="https://unpkg.com/ws-rpc-messaging@0.0.5/lib/ws-rpc-messaging.min.js"></script>`

## ws-rpc-messaging provide json-rpc 2.0 like way to communicate between client and server via websockets

Lib has been written to use in complex with [ws package](https://www.npmjs.com/package/ws)

* [How to use](#how-to-use)
* [Server](#server)
  * [recieve-error event](#event-recieve-error)
  * [request event](#event-request)
* [Node client](#node-client)
  * [recieve-error event](#event-client-recieve-error)
  * [request event](#event-client-request)
  * [notify](#clientnotifymethod-params)
  * [request](#clientrequestmethod-params-promise)
  * [respond](#clientrespondid-result)
  * [throw](#clientthrowid-error)
* [Browser client](#browser-client)
* [Broadcast](#broadcast)
* [Usefull links](#usefull-links)

## How to use

For working examples and details [see examples](/examples)

## API

### Server

Server class extends [WebSocket.Server from ws pacakge](https://github.com/websockets/ws/blob/master/doc/ws.md#class-websocketserver)

#### Event: 'recieve-error'

* error  {Error}
* client {Client}, sender
* server {Server}, self-link for server

Emitted when can't parse recieved message

#### Event: 'request'

* request {Object} json-rpc 2.0 Request object
* client  {Client}, sender
* server  {Client}, self-link for server

```js
const { Server } = require('../../lib')

const rpc = new Server({ port: 3000 })

const fns = {
    sum: (...args) => args.reduce((acc, n) => acc + n, 0),
    sub: (...args) => args.slice(1).reduce((acc, n) => acc - n, args[0]),
}

/**
 * You can use routing or write any logic you want here...
 * Just don't forget to send response or error if request.id !== undefined
 */
rpc.on('request', (request, client) => {
    const fn = fns[request.method]

    if (fn) {
        const result = fn(...request.params)

        /** request.id is important!!! */
        client.respond(request.id, result)

        return
    }

    /** throw not found error if have request id, it's not notification request */
    if (request.id) {
        client.throwNotFound(request.id, `method ${request.method} not found`)
    }
})

```

### Node client

Client class extends [WebSocket from ws pacakge](https://github.com/websockets/ws/blob/master/doc/ws.md#class-websocket)

#### Event (client): 'recieve-error'

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
const { Client } = require('../../lib')

const client = new Client('ws://localhost:3000')

client.on('open', () => {
    client.request('sum', [1, 3, 5])
        .then(console.log) // 9
        .catch(console.error)

    client.request('sub', [10, 2, 3])
        .then(console.log) // 5
        .catch(console.error)

    client.request('multiply', [2, 2, 3])
        .then(console.log)
        .catch(console.error) // not found
})
```

### Browser client

Browser client class extends native WebSocket. Instead request and reciever-error events it has properties as handlers.

#### Property onrecieveerror

* error  {Error}
* client {Client}, self-link for client

Emitted when can't parse recieved message

#### Property request

* request {Object} json-rpc 2.0 Request object
* client  {Client}, self-link for client

Other API is the same as [Node Client](#node-client)

```js
/**
 * Browser client has api like native WebSocket
 * If you are using lib via script <script src="../../lib/ws-rpc-messaging.min.js" type="text/javascript"></script>
 * window.RPCClient will be browser client
 */
const client = new RPCClient('ws://localhost:3000')

client.onopen = () => {
    client.request('sum', [1, 3, 5])
        .then(console.log) // 9
        .catch(console.error)

    client.request('sub', [10, 2, 3])
        .then(console.log) // 5
        .catch(console.error)

    client.request('multiply', [2, 2, 3])
        .then(console.log)
        .catch(console.error) // not found
}
```

### Broadcast

```js
/**
 * For broabcast use server.clients
 * All see https://github.com/websockets/ws#server-broadcast
 */
rpc.on('request', (request, origin, server) => {
    server.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.notify('to.something', { data: 'important message' });
        }
    });
})
```

## Usefull links

* [ws package](https://www.npmjs.com/package/ws)
* [json-rpc 2.0 specification](https://www.jsonrpc.org/specification)
