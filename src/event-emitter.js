class EventEmitter {
    constructor() {
        this._handlers = {}
    }

    _has(event) {
        return Array.isArray(this._handlers[event])
    }

    on(event, handler) {
        if (!this._has(event)) {
            this._handlers[event] = []
        }
        
        this._handlers[event].push(handler)
    }

    emit(event, ...args) {
        if (this._has(event)) {
            this._handlers[event].forEach((handler) => { handler(...args); })
        }
    }

    remove(event, handler) {
        if (this._has(event)) {
            this._handlers[event] = this._handlers[event].filter(it => it !== handler)
        }
    }
}

export default EventEmitter