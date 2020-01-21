const recieveAPI = {
    handleReceiverError(error) {
        this.emit('recieve-error', error, this)
    },

    handleReceiverRequest(request) {
        this.emit('request', request, this)
    }
}

export default recieveAPI
