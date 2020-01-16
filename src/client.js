const uuid = require('uuid/v4')
const Sender = require('./sender')
const Reciever = require('./reciever')
const EventEmitter = require('./event-emitter')

class Client extends EventEmitter {
    constructor(ws) {
        super()
        this.ws = ws
        this.pendings = {}
        this.sender = new Sender(this.ws)
        this.reciever = new Reciever(this.ws)
        this.ws.rpc = {
            ...this.sender.api(),
            request: this.request
        }
        this.reciever.on('error', this.__handleError)
        this.reciever.on('request', this.__handleRequest)
        this.reciever.on('response', this.__handleResponse)
    }

    request = (method, params) => {
        const id = uuid()

        return new Promise((resolve, reject) => {
            this.pendings[id] = {
                resolve,
                reject,
                created: Date.now()
            }

            this.sender.request(method, params, id)
        })
    }

    __handleRequest = (request) => {
        this.dispatch('request', request, this.ws)
    }

    __handleError = (message) => {
        const { id, error } = message

        if (id !== null && id !== undefined && this.pendings[id]) {
            this.pendings[id].reject(error)
        } else {
            this.dispatch('error', message, this.ws)
        }
    }

    __handleResponse = ({ id, result }) => {
        if (this.pendings[id]) {
            this.pendings[id].resolve(result)
        }
    }
}

module.exports = Client
