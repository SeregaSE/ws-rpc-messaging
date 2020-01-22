class Message {
    constructor(jsonrpc) {
        this.jsonrpc = jsonrpc;
    }

    toJSON() {
        return {
            jsonrpc: this.jsonrpc,
        };
    }
}

export default Message;
