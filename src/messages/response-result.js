import Response from './response';

class ResponseResult extends Response {
    constructor(jsonrpc, result, id) {
        super(jsonrpc, 'result', result, id);
    }
}

export default ResponseResult;
