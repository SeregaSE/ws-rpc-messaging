import RPCWebSocket from './rpc-websocket';
import BrowserWebSocket from './browser-websocket';

class BrowserRPCWebSocket extends RPCWebSocket {
    constructor(...args) {
        super(new BrowserWebSocket(...args));
    }
}

export default BrowserRPCWebSocket;
