import {
    ERROR,
    REQUEST,
    RESPONSE,
    NOTIFICATION,
} from '../constants';

const getType = (message) => {
    const {
        method,
        result,
        error,
        id,
    } = message;

    if (method && id) {
        return REQUEST;
    }

    if (method) {
        return NOTIFICATION;
    }

    if (result && id) {
        return RESPONSE;
    }

    if (error && id) {
        return ERROR;
    }

    return null;
};

export default getType;
