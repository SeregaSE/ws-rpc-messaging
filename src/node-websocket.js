import RPCWebSocket from './websocket'

class NodeRPCWebSocket extends RPCWebSocket {
    constructor(ws) {
        super(ws)
        this._ws.on('message', this._reciever.onMessage)

    }

    ping(...args) {
        this._ws.ping(...args)
    }

    pong(...args) {
        this._ws.pong(...args)
    }

    terminate(...args) {
        this._ws.terminate(...args)
    }
}

export default NodeRPCWebSocket
