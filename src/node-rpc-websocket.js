import RPCWebSocket from './rpc-websocket';

class NodeRPCWebSocket extends RPCWebSocket {
    terminate(...args) {
        this.ws.terminate(...args);
    }

    ping(...args) {
        this.ws.ping(...args);
    }

    pong(...args) {
        this.ws.pong(...args);
    }
}

export default NodeRPCWebSocket;
