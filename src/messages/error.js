import Message from './message';

class ErrorMessage extends Message {
    constructor(jsonrpc, error, id) {
        super(jsonrpc);
        this.error = error;
        this.id = id;
    }

    get error() {
        return this._error;
    }

    set error(value) {
        if (typeof value !== 'object') {
            throw new Error('error must be object');
        }

        if (typeof value.code !== 'number') {
            throw new Error('error must has code, typeof number');
        }

        if (typeof value.message !== 'string' || value.message.length === 0) {
            throw new Error('error must has message, typeof string, not empty');
        }

        this._error = value;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        if (typeof value === 'number') {
            if (Number.isInteger(value)) {
                this._id = value;
                return;
            }

            throw new Error(`id must be integer, got ${value}`);
        }

        if (typeof value === 'string') {
            if (value.length > 0) {
                this._id = value;
                return;
            }

            throw new Error('id must be not empty string');
        }

        if (value === null) {
            this._id = value;
            return;
        }

        throw new Error('id must be | int | string | null');
    }

    toJson() {
        return {
            ...super.toJson(),
            error: this.error,
            id: this.id,
        };
    }
}

export default ErrorMessage;
