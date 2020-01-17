import RPCError from './RPCError'
import { INTERNAL_ERROR } from '../constants'

class InternalError extends RPCError {
    constructor(data) {
        super(INTERNAL_ERROR.code, INTERNAL_ERROR.message, data)
    }
}

export default InternalError