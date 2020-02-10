const { Server, NOT_FOUND_ERROR, INTERNAL_ERROR } = require('../../lib');

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
