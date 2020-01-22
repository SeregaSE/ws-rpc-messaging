import RPCWebSocket from './rpc-websocket';

class BrowserRPCWebSocket extends RPCWebSocket {
    constructor(...args) {
        super(new WebSocket(...args));
    }
}

export default BrowserRPCWebSocket;
