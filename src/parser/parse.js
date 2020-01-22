import {
    ERROR,
    REQUEST,
    RESPONSE,
    NOTIFICATION,
} from '../constants';
import {
    Request,
    Notification,
    ResponseError,
    ResponseResult,
} from '../messages';
import validate from '../validate';
import parseType from './parseType';

const parse = (message) => {
    validate.message(message);

    const type = parseType(message);

    switch (type) {
    case REQUEST:
        validate.request(message);
        return [
            type,
            new Request(
                message.jsonrpc,
                message.method,
                message.params,
                message.id,
            ),
        ];
    case NOTIFICATION:
        validate.notification(message);
        return [
            type,
            new Notification(
                message.jsonrpc,
                message.method,
                message.params,
            ),
        ];
    case RESPONSE:
        validate.response(message);
        return [
            type,
            new ResponseResult(
                message.jsonrpc,
                message.result,
                message.id,
            ),
        ];
    case ERROR:
        validate.error(message);
        return [
            type,
            new ResponseError(
                message.jsonrpc,
                message.error,
                message.id,
            ),
        ];
    default:
        throw new Error('unexpected type');
    }
};

export default parse;
