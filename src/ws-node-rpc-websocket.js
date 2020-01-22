import WebSocket from 'ws';
import NodeRPCWebSocket from './node-rpc-websocket';

class WsNodeRPCWebSocket extends NodeRPCWebSocket {
    constructor(...args) {
        super(new WebSocket(...args));
    }
}

export default WsNodeRPCWebSocket;
