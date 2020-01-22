import {
    isString,
    isObject,
    isUndefined,
} from './validator';

const isNotification = (data) => {
    const { method, params } = data;

    if (!isString(method)) {
        throw new Error('method field is not a string');
    }

    if (method.length < 1) {
        throw new Error('method field is required');
    }

    if (!isUndefined(params)) {
        if (!isObject(params) && !Array.isArray(params)) {
            throw new Error('params field in not valid, array or object expected');
        }
    }

    return true;
};

export default isNotification;
