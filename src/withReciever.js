import Reciever from './reciever';

const withReciever = (ws) => {
    ws._rpcreciever = new Reciever();
    ws._rpcreciever.on('error', ws.handleReceiverError.bind(ws));
    ws._rpcreciever.on('request', ws.handleReceiverRequest.bind(ws));
    ws._rpcreciever.on('response', ws.handleRecieverResponse.bind(ws));
    ws._rpcreciever.on('response_error', ws.handleRecieverResponseError.bind(ws));
    return ws;
};

export default withReciever;
