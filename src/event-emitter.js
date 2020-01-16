class EventEmmitter {
    constructor() {
        this.handlers = {}
    }

    on(name, handler) {
        if (!Array.isArray(this.handlers[name])) {
            this.handlers[name] = []
        }

        this.handlers[name].push(handler)
    }

    dispatch(name, ...args) {
        if (Array.isArray(this.handlers[name])) {
            this.handlers[name].forEach(handler => { handler(...args) })
        }
    }

    remove(name, handler) {
        if (Array.isArray(this.handlers[name])) {
            this.handlers[name] = this.handlers[name].filter(it => it !== handler)
        }
    }
}

module.exports = EventEmmitter
