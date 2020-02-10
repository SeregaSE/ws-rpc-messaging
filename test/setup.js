const { Server, NOT_FOUND_ERROR, INTERNAL_ERROR } = require('../lib');

module.exports = () => new Promise((resolve) => {
    const fns = {
        sum: (...args) => args.reduce((acc, n) => acc + n, 0),
        sub: (...args) => args.slice(1).reduce((acc, n) => acc - n, args[0]),
    };

    const server = new Server({ port: 3000 });

    server.on('connection', (client) => {
        client.on('request', ({ id, method, params }, origin) => {
            if (typeof fns[method] === 'function') {
                try {
                    origin.respond(id, fns[method](...params));
                } catch (error) {
                    origin.throw(id, INTERNAL_ERROR);
                }
            } else {
                origin.throw(id, NOT_FOUND_ERROR);
            }
        });
    });

    server.on('listening', () => {
        console.log('wss server is listening localhost:3000');
        resolve();
    });

    global.__WSS__ = server;
});
