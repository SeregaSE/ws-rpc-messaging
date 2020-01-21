import RPCError from './RPCError';
import { INVALID_REQUEST_ERROR } from '../constants';

class InvalidRequestError extends RPCError {
    constructor(data) {
        super(INVALID_REQUEST_ERROR.code, INVALID_REQUEST_ERROR.message, data);
    }
}

export default InvalidRequestError;
