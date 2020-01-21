import withRPC from './withRPC';

const withNodeRPC = (ws, ...args) => {
    withRPC(ws, ...args);
    ws.on('message', ws._rpcreciever.onMessage);
    return ws;
};

export default withNodeRPC;
