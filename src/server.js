const Client = require('./client')
const EventEmitter = require('./event-emitter')

class Server extends EventEmitter {
    constructor(wss) {
        super()
        this.wss = wss
        this.wss.on('connection', this.__onConnection)
    }

    __onConnection = (ws) => {
        const client = new Client(ws)
        client.on('error', this.__handleError)
        client.on('request', this.__handleRequest)
        client.on('response', this.__handleResponse)
    }

    __handleError = (error, client) => {
        this.dispatch('error', error, client, this.wss)
    }

    __handleRequest = (request, client) => {
        this.dispatch('request', request, client, this.wss)
    }

    __handleResponse = (response, client) => {
        this.dispatch('response', response, client, this.wss)
    }
    
    listen = (...args) => {
        this.wss._server.listen(...args)
    }
}

module.exports = Server
