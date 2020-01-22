import ws from 'ws';
import Server from './rpc-server';
import WebSocket from './ws-node-rpc-websocket';

WebSocket.CONNECTING = ws.CONNECTING;
WebSocket.OPEN = ws.OPEN;
WebSocket.CLOSING = ws.CLOSING;
WebSocket.CLOSED = ws.CLOSED;
WebSocket.Server = Server;

export default WebSocket;
