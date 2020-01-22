import {
    isNull,
    isString,
} from './validator';

const isId = (id) => {
    if (isString(id) && id.length > 0) {
        return true;
    }

    if (Number.isInteger(id)) {
        return true;
    }

    if (isNull(id)) {
        return true;
    }

    throw new Error('id field in not valid, expect string, int or null');
};

export default isId;
