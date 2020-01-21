import { JSONRPC_VERSION } from '../constants';

const sendAPI = {
    _send(message) {
        /** Debug all sended data */
        // console.log('send', JSON.stringify({
        //     jsonrpc: JSONRPC_VERSION,
        //     ...message
        // }))

        this.send(JSON.stringify({
            jsonrpc: JSONRPC_VERSION,
            ...message,
        }));
    },
};

export default sendAPI;
