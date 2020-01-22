import Message from './message';

class Response extends Message {
    constructor(jsonrpc, field, value, id) {
        super(jsonrpc);
        this.field = field;
        this.value = value;
        this.id = id;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            [this.field]: this.value,
            id: this.id,
        };
    }
}

export default Response;
