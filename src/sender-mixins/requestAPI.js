const uuid = require('uuid/v4')
const sendAPI = require('./sendAPI')

const requestAPI = {
    __proto__: sendAPI,

    notify(method, params) {
        this._send({
            method,
            params
        })
    },

    request(method, params) {
        if (typeof this._pendings !== 'object') {
            this._pendings = {}
        }

        const id = uuid()

        return new Promise((resolve, reject) => {
            this._pendings[id] = {
                resolve,
                reject,
            }

            this._send({
                method,
                params,
                id
            })
        })
    },

    __handleRecieverResponse(message) {
        if (this._hasRequest(message.id)) {
            this._pendings[message.id].resolve(message.result)
        }
    },

    __handleRecieverResponseError(message) {
        if (this._hasRequest(message.id)) {
            this._pendings[message.id].reject(message.error)
        }
    },

    _hasRequest(id) {
        return typeof this._pendings === 'object' && this._pendings[id] 
    },

    _deleteRequest(id) {
        if (this._hasRequest(id)) {
            delete this._pendings[id]
        }
    }
}

module.exports = requestAPI