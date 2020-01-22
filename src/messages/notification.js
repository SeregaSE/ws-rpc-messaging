import Message from './message';

class Notification extends Message {
    constructor(jsonrpc, method, params) {
        super(jsonrpc);
        this.method = method;
        this.params = params;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            method: this.method,
            params: this.params,
        };
    }
}

export default Notification;
