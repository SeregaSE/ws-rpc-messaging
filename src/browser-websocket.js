class BrowserWebSocket extends WebSocket {
    on = (event, handler) => {
        if (event === 'message') {
            this._addOnMessageEventListener(event, handler);
        } else {
            this.addEventListener(event, handler);
        }
    }

    remove = (event, handler) => {
        if (event === 'message') {
            this._removeOnMessageEventListener(event);
        } else {
            this.removeEventListener(event, handler);
        }
    }

    _addOnMessageEventListener = (event, handler) => {
        this._onMessageEventListener = this._createOnMessageEventListener(handler);
        this.addEventListener(event, this._onMessageEventListener);
    }

    _removeOnMessageEventListener = (event) => {
        this.removeEventListener(event, this._onMessageEventListener);
    }

    _createOnMessageEventListener = (handler) => (event) => {
        handler(event.data);
    }
}

export default BrowserWebSocket;
