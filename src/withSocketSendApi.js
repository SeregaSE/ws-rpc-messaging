const {
    ParseError,
    InvalidRequest,
    NotFound,
    InvalidParams,
    InternalError,
    JsonRpcError
} = require('./errors')
const { JSONRPC_VERSION } = require('./constants')
const { ErrorMessage } = require('./reciever/messages')

const withSocketSendApi = ws => {
    const send = (data) => ws.send(JSON.stringify({
        jsonrpc: JSONRPC_VERSION,
        ...data
    }))

    const respond = (field, value, id) => send({
        [field]: value,
        id
    })

    const sendResult = (data, id) => respond('result', data, id)
    const sendError = (error, id) => respond('result', error, id)

    const request = (method, params, id) => send({
        method,
        params,
        id
    })

    ws.rpc = {
        send,
        request,
        respond: sendResult,
        throwError: sendError,
        throw: (code, message, data, id) => sendError(new JsonRpcError(code, message, data), id),
        throwParseError: (data, id) => sendError(ParseError(data), id),
        throwInvalidRequest: (data, id) => sendError(InvalidRequest(data), id),
        throwNotFound: (data, id) => sendError(NotFound(data), id),
        throwInvalidParams: (data, id) => sendError(InvalidParams(data), id),
        throwInternalError: (data, id) => sendError(InternalError(data), id),
    }

    return ws
}

module.exports = withSocketSendApi
