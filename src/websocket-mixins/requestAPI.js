import uuid from 'uuid/v4';
import sendAPI from './sendAPI';

const requestAPI = {
    __proto__: sendAPI,

    notify(method, params) {
        super._send({
            method,
            params,
        });
    },

    request(method, params) {
        if (typeof this._pendings !== 'object') {
            this._pendings = {};
        }

        const id = uuid();

        return new Promise((resolve, reject) => {
            this._pendings[id] = {
                resolve,
                reject,
            };

            super._send({
                method,
                params,
                id,
            });
        });
    },

    handleRecieverResponse(message) {
        if (this._hasRequest(message.id)) {
            this._pendings[message.id].resolve(message.result);
            this._deleteRequest(message.id);
        }
    },

    handleRecieverResponseError(message) {
        if (this._hasRequest(message.id)) {
            this._pendings[message.id].reject(message.error);
            this._deleteRequest(message.id);
        }
    },

    _hasRequest(id) {
        return typeof this._pendings === 'object' && this._pendings[id];
    },

    _deleteRequest(id) {
        if (this._hasRequest(id)) {
            delete this._pendings[id];
        }
    },
};

export default requestAPI;
