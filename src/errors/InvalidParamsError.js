import RPCError from './RPCError'
import { INVALID_PARAMS_ERROR } from '../constants'

class InvalidParamsError extends RPCError {
    constructor(data) {
        super(INVALID_PARAMS_ERROR.code, INVALID_PARAMS_ERROR.message, data)
    }
}

export default InvalidParamsError