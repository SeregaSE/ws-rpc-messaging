import Response from './response';

class ResponseResult extends Response {
    constructor(jsonrpc, result, id) {
        super(jsonrpc, 'result', result, id);
    }

    get result() {
        return this.value;
    }
}

export default ResponseResult;
