import withReciever from './withReciever'
import { errorAPI, recieveAPI, requestAPI, responseAPI } from './websocket-mixins'

const withRPC = (ws, overrides = {}) => {
    Object.assign(ws.__proto__, errorAPI, recieveAPI, requestAPI, responseAPI, overrides);
    withReciever(ws)
    ws.onmessage = ws.__onMessage
    return ws;
}

export default withRPC