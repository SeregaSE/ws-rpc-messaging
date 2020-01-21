import RPCWebSocket from './websocket'

class BrowserRPCWebSocket extends RPCWebSocket {
    constructor(...args) {
        super(new WebSocket(...args))
        this.onmessage = this._onMessage
    }

    _onMessage = (event) => {
        this._reciever.onMessage(event.data)
    }
    
    close(...args) {
        this._ws.close(...args)
    }
}

export default BrowserRPCWebSocket
