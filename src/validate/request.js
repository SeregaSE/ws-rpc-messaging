import id from './id';
import notification from './notification';

const isRequest = (data) => {
    notification(data);
    return id(data.id);
};

export default isRequest;
