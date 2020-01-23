import parse from './parser';
import validate from './validate';
import { ERROR } from './constants';
import { ParseError } from './errors';
import EventEmitter from './event-emitter';
import messageFactory from './message-factory';

class Receiver extends EventEmitter {
    onMessage = (string) => {
        /** Debug all recieved raw data */
        // console.log('recieve', string);
        let json;

        try {
            json = JSON.parse(string);
        } catch (error) {
            this.onMessageCatch(error);
            return;
        }

        if (!Array.isArray(json)) {
            json = [json];
        }

        json.forEach((data) => {
            try {
                const [type, message] = parse(data);

                /** Debug all recieved and sucess parsed messages */
                // console.log('recieve', type, message);
                this.emit(type, message);
            } catch (error) {
                this.onMessageCatch(error, data);
            }
        });
    }

    onMessageCatch(error, data) {
        let id = null;

        try {
            if (validate.message(data) && validate.id(data.id)) {
                id = data.id;
            }
        /* eslint-disable-next-line no-empty */
        } catch (_) {}


        const message = messageFactory.CreateError(id, new ParseError(error.message));

        this.emit(ERROR, message);
    }
}

export default Receiver;
