import withBrowserRPC from './withBrowserRPC';

class RPCWebSocket extends WebSocket {
    constructor(...args) {
        super(...args);
        withBrowserRPC(this);
    }
}

export default RPCWebSocket;
