const Reciever = require('./reciever')
const EventEmitter = require('./event-emitter')
const withSocketSendApi = require('./withSocketSendApi')

class Client extends EventEmitter {
    constructor(ws) {
        super()
        this.ws = withSocketSendApi(ws)
        this.reciever = new Reciever(this.ws)
        this.reciever.on('error', this.__handleError)
        this.reciever.on('request', this.__handleRequest)
        this.reciever.on('response', this.__handleResponse)
    }

    __handleError = (error) => {
        this.dispatch('error', error, this.ws)
    }

    __handleRequest = (request) => {
        this.dispatch('request', request, this.ws)
    }

    __handleResponse = (response) => {
        this.dispatch('response', response, this.ws)
    }
}

module.exports = Client
