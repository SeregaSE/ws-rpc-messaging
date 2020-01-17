import RPCWebSocket from './websocket'

class BrowserRPCWebSocket extends RPCWebSocket {
    constructor(...args) {
        super(new WebSocket(...args))
        this.onmessage = this._reciever.onMessage

    }
    
    close(...args) {
        this._ws.close(...args)
    }
}

export default BrowserRPCWebSocket
