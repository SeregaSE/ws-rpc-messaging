import Notification from './notification';

class Request extends Notification {
    constructor(jsonrpc, method, params, id) {
        super(jsonrpc, method, params);
        this.id = id;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            id: this.id,
        };
    }
}

export default Request;
