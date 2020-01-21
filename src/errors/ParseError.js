import RPCError from './RPCError';
import { PARSE_ERROR } from '../constants';

class ParseError extends RPCError {
    constructor(data) {
        super(PARSE_ERROR.code, PARSE_ERROR.message, data);
    }
}

export default ParseError;
