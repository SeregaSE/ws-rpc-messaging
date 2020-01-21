const { Server } = require('../../lib')

const rpc = new Server({ port: 3000 })

const fns = {
    sum: (...args) => args.reduce((acc, n) => acc + n, 0),
    sub: (...args) => args.slice(1).reduce((acc, n) => acc - n, args[0]),
}

rpc.on('connection', (client) => {
    client.notify('auth', { login: 'Mr. Math', timestamp: Date.now() })
})

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
