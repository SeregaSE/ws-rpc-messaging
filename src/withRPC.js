import withReciever from './withReciever';
import {
    errorAPI, recieveAPI, requestAPI, responseAPI,
} from './websocket-mixins';

const withRPC = (ws, overrides = {}) => {
    Object.assign(
        Object.getPrototypeOf(ws),
        errorAPI,
        recieveAPI,
        requestAPI,
        responseAPI,
        overrides,
    );
    withReciever(ws);
    return ws;
};

export default withRPC;
