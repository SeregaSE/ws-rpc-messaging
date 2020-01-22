import {
    Request,
    Notification,
    ResponseError,
    ResponseResult,
} from './messages';
import {
    JSONRPC_VERSION,
} from './constants';

function CreateError(id, error) {
    return new ResponseError(JSONRPC_VERSION, error, id);
}

function CreateNotify(method, params) {
    return new Notification(JSONRPC_VERSION, method, params);
}

function CreateRequest(id, method, params) {
    return new Request(JSONRPC_VERSION, method, params, id);
}

function CreateResponse(id, result) {
    return new ResponseResult(JSONRPC_VERSION, result, id);
}

export default {
    CreateError,
    CreateNotify,
    CreateResponse,
    CreateRequest,
};
