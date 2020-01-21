import withRPC from './withRPC';

const withBrowserRPC = (ws) => {
    withRPC(ws, {
        handleReceiverError(error) {
            if (typeof this.onrecieerrror === 'function') {
                this.onrecieerrror(error, this);
            }
        },

        handleReceiverRequest(request) {
            if (typeof this.onrequest === 'function') {
                this.onrequest(request, this);
            }
        },
    });
    ws.onmessage = (event) => { ws._rpcreciever.onMessage(event.data); };
    return ws;
};

export default withBrowserRPC;
