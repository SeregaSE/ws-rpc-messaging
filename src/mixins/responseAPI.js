import sendAPI from './sendAPI'

const responseAPI = {
    __proto__: sendAPI,

    respond(id, result) {
        super._send({
            id,
            result
        })
    }
}

export default responseAPI