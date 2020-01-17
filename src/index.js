import * as constants from './constants'
import NodeRPCWebSocket from './node-websocket'
import WebSocketServer from './websocket-server'

export default {
    Client: NodeRPCWebSocket,
    Server: WebSocketServer,
    ...constants
}