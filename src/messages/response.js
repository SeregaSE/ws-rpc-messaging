import Message from './message'

class ResponseMessage extends Message {
    constructor(jsonrpc, result, id) {
        super(jsonrpc)
        this.result = result
        this.id = id
    }

    get result() {
        return this._result
    }

    set result(value) {
        if (value !== undefined) {
            return this._result = value
        }

        throw new Error(`result is required`)
    }

    get id() {
        return this._id
    }
    
    set id(value) {
        if (typeof value === 'number') {
            if (Number.isInteger(value)) {
                return this._id = value
            }

            throw new Error(`id must be integer, got ${value}`)
        }

        if (typeof value === 'string') {
            if (value.length > 0) {
                return this._id = value
            }

            throw new Error(`id must be not empty string`)
        }

        if (value === null) {
            return this._id = value
        }

        throw new Error(`id must be | int | string | null`)
    }
    
    toString() {
        return {
            ...super.toString(),
            result: this.result,
            id: this.id
        }
    }
}

export default ResponseMessage
