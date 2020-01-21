import withRPC from './withRPC'

const withBrowserRPC = (ws, ...args) => {
    withRPC(ws, ...args)
    ws.onmessage = event => { ws._rpcreciever.onMessage(event.data) }
    return ws
}

export default withBrowserRPC