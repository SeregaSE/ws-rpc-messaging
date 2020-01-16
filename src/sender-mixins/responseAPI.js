const sendAPI = require('./sendAPI')

const responseAPI = {
    __proto__: sendAPI,

    respond(id, result) {
        this._send({
            id,
            result
        })
    }
}

module.exports = responseAPI