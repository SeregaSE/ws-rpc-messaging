const { RPCWebSocketServer } = require('../../src')

const wss = new RPCWebSocketServer({ port: 8080 })

const fns = {
    sum: (...args) => args.reduce((acc, n) => acc + n, 0),
    sub: (...args) => args.slice(1).reduce((acc, n) => acc - n, args[0]),
}

/**
 * You can use routing or write any logic you want here...
 * Just don't forget to send response or error if request.id !== undefined
 */
wss.on('request', (request, client) => {
    const fn = fns[request.method]

    if (fn) {
        const result = procedure(request.params)
        /** request.id is important!!! */
        client.rpc.response(result, request.id)
    } else {
        client.rpc.throwNotFound(`method ${request.method} not found`)
    }
})
