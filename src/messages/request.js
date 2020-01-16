const Message = require('./message')

class RequestMessage extends Message {
    constructor(jsonrpc, method, params, id) {
        super(jsonrpc)
        this.method = method
        this.params = params
        this.id = id
    }

    get method() {
        return this._method
    }

    set method(value) {
        if (typeof value === 'string' && value.length > 0) {
            return this._method = value
        }

        throw new Error(`method must be not empty string`)
    }

    get params() {
        return this._params
    }

    set params(value) {
        if (value === null) {
            throw new Error(`params must be ommited | array | object, got null`)
        }

        if (typeof value === 'object' || value === undefined) {
            return this._params = value
        }

        throw new Error(`params must be ommited | array | object`)
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

        if (value === null || value === undefined) {
            return this._id = value
        }

        throw new Error(`id must be ommited | int | string | null`)
    }

    toString() {
        return JSON.stringify(this.toJSON())
    }
    
    toJSON() {
        return {
            ...super.toJSON(),
            method: this.method,
            params: this.params,
            id: this.id
        }
    }
}

module.exports = RequestMessage