import RPCError from './RPCError';
import { NOT_FOUND_ERROR } from '../constants';

class NotFoundError extends RPCError {
    constructor(data) {
        super(NOT_FOUND_ERROR.code, NOT_FOUND_ERROR.message, data);
    }
}

export default NotFoundError;
