import {
    isUndefined,
} from './validator';
import id from './id';

const isResponseResult = (data) => {
    id(data.id);

    if (isUndefined(data.result)) {
        throw new Error('result field is required');
    }

    return true;
};

export default isResponseResult;
