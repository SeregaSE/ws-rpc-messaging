# LIB IN DEV

First realese (1.0.0) is planned on 15.02.2020

TO DO:
- write tets, set up ci/cd (mb travis)
- call helper
- bulk messaging
- find better solution to proxy ws/wss api to own classes (mb use Proxy)
- check cjs browser module

## ws-rpc-messaging provide json-rpc 2.0 like way to communicate between client and server via websockets

Lib has been written to use in complex with [ws package](https://www.npmjs.com/package/ws) but you could use any other ws realization with same api.

- [How to use](#how-to-use)
- [Server](#server)
- [Node client](#node-client)
- [Browser client](#browser-client)
- [Broadcast](#broadcast)
- [Usefull links](#usefull-links)

## How to use

For working examples and more information [see examples dir](/tree/master/examples)

### Server

```js
const WebSocket = require('ws')
const { Server } = require('../../lib')

/**
 * Create and configure any websocket server you want
 */
const wss = new WebSocket.Server({ port: 3000 })
/**
 * Provide it to RPCServer
 * RPCServer will handle incoming request and helps you to respond on recieved messages or send own requests  
 */
const rpc = new Server(wss)

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

        /** request.id is important!!! it helps clients to resolve request */
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

```js
const WebSocket = require('ws')
const { Client } = require('../../lib')

/**
 * Create and configure any websocket you want
 */
const ws = new WebSocket('ws://localhost:3000')
/**
 * Provide it to RPCClient
 * RPCClient will handle incoming request and helps you to respond on recieved messages or send own requests  
 */
const client = new Client(ws)

ws.on('open', () => {
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

[ws package](https://www.npmjs.com/package/ws)
[json-rpc 2.0 specification](https://www.jsonrpc.org/specification)
