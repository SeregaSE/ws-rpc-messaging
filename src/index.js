// const BrowserRPCWebSocket = require('./browser-websocket')
const NodeRPCWebSocket = require('./node-websocket')
const WebSocketServer = require('./websocket-server')

const constants = require('./constants')

module.exports = {
    // BrowserRPCWebSocket,
    Client: NodeRPCWebSocket,
    Server: WebSocketServer,
    ...constants
}