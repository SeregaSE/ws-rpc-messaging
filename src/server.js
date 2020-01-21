import ws from 'ws'
import withNodeRPC from './withNodeRPC';

class RPCWebSocketServer extends ws.Server {
    constructor(...args) {
        super(...args)
        this.on('connection', this.handleConnection)
    }

    handleConnection = ws => {
        withNodeRPC(ws, {
            handleReceiverError: this.createClientReceiverErrorHandle(ws),
            handleReceiverRequest: this.createClientReceiverRequestHandle(ws),
        })
    }

    createClientReceiverErrorHandle = (client) => (error) => {
        this.emit('error', error, client, this)
    }

    createClientReceiverRequestHandle = (client) => (request) => {
        this.emit('request', request, client, this)
    }
}

export default RPCWebSocketServer
