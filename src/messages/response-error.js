import Response from './response';

class ResponseError extends Response {
    constructor(jsonrpc, error, id) {
        super(jsonrpc, 'error', error, id);
    }

    get error() {
        return this.value;
    }
}

export default ResponseError;
