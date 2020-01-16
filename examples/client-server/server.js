
const WebSocket = require('ws')
const { Server } = require('../../src')

const wss = new WebSocket.Server({ port: 8080 })
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
        /** request.id is important!!! */
        client.respond(request.id, result)
    } else {
        client.throwNotFound(request.id, `method ${request.method} not found`)
    }
})
