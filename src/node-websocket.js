import WebSocket from 'ws';
import withNodeRPC from './withNodeRPC';

class RPCWebSocket extends WebSocket {
    constructor(...args) {
        super(...args);
        withNodeRPC(this);
    }
}

export default RPCWebSocket;
