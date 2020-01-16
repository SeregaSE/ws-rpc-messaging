const sendAPI = require('./sendAPI')

const responseAPI = {
    __proto__: sendAPI,

    respond(id, result) {
        super._send({
            id,
            result
        })
    }
}

module.exports = responseAPI