import ws from 'ws'
import Server from './server'
import Client from './node-websocket'

export default {
    Server,
    Client,
    CONNECTING: ws.CONNECTING,
    OPEN: ws.OPEN,
    CLOSING: ws.CLOSING,
    CLOSED: ws.CLOSED,
}