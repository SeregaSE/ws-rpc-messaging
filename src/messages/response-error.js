import Response from './response';

class ResponseError extends Response {
    constructor(jsonrpc, error, id) {
        super(jsonrpc, 'error', error, id);
    }
}

export default ResponseError;
