import {
    isString,
    isObject,
} from './validator';
import id from './id';

const isResponseError = (data) => {
    id(data.id);

    if (!isObject(data.error)) {
        throw new Error('error field is required');
    }

    if (!Number.isInteger(data.error.code)) {
        throw new Error('error.code field is required, int');
    }

    if (!isString(data.error.message)) {
        throw new Error('error.message field is required, string');
    }

    return true;
};

export default isResponseError;
