class EventEmitter {
    constructor() {
        this.handlers = {}
    }

    _has(event) {
        return Array.isArray(this.handlers[event])
    }

    on(event, handler) {
        if (!this._has(event)) {
            this.handlers[event] = []
        }
        
        this.handlers[event].push(handler)
    }

    emit(event, ...args) {
        if (this._has(event)) {
            this.handlers[event].forEach(handler => { handler(...args); })
        }
    }

    remove(event, handler) {
        if (this._has(event)) {
            this.handlers[event] = this.handlers[event].filter(it => it !== handler)
        }
    }
}

module.exports = EventEmitter