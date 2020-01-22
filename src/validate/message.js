import {
    JSONRPC_VERSION,
} from '../constants';
import {
    is,
    isObject,
} from './validator';

const isMessage = (data) => {
    if (!isObject(data)) {
        throw new Error('message is not an object');
    }

    const { jsonrpc } = data;

    if (!is(jsonrpc, JSONRPC_VERSION)) {
        throw new Error('jsonrpc field is not valid, 2.0 version expected');
    }

    return true;
};

export default isMessage;
