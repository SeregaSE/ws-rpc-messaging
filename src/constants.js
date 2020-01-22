/* specification version */
export const JSONRPC_VERSION = '2.0';
/* specification errors */
export const PARSE_ERROR = { message: 'Parse error', code: -32700 };
export const INVALID_REQUEST_ERROR = { message: 'Invalid request', code: -32600 };
export const NOT_FOUND_ERROR = { message: 'Method not found', code: -32601 };
export const INVALID_PARAMS_ERROR = { message: 'Invalid params', code: -32602 };
export const INTERNAL_ERROR = { message: 'Internal error', code: -32603 };
/* specification message types */
export const ERROR = 'error';
export const REQUEST = 'request';
export const RESPONSE = 'response';
export const NOTIFICATION = 'notify';
/* global */
export const DEFAULT_REQUEST_TIMEOUT_MILLISECONDS = 2500;
