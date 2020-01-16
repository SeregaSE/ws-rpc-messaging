const BrowserClient = require('./src/browser-client')

const ws = new BrowserClient('ws://localhost:8080')

console.log(ws)