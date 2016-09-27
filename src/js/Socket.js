import * as uuid from '../af/modules/uuid.js';


let Socket = {

    _host: '',
    _hostId: 0,

    /** @type {WebSocket} */
    _websocket: null,
    _online: false,
    _connected: false,
    _connecting: false,
    _stop: false,
    _onStatusChange: null,

    _decelerate: null,
    _decelerateTimeout: 0,
    _decelerateMaxTimeout: 30,

    _onceQueue: null,
    _listeners: null,
    _connectedHandler: null,

    get isConnected() {
        return this._connected;
    },

    set isConnected(value) {
        this._connected = value;
        this._statusChange();
    },

    get isConnecting() {
        return this._connecting;
    },

    set isConnecting(value) {
        this._connecting = value;
        this._statusChange();
    },


    get isOnline() {
        return this._online;
    },

    set isOnline(value) {
        this._online = value;
        this._statusChange();
    },

    _make: function({ host }) {
        this._host = host;
        this._onceQueue = {};
        this._listeners = {};
        this._onStatusChange = [];
        this._connectedHandler = [];

        this.isOnline = navigator.onLine;

        // bind event listeners to Object.
        this._onSocketClosed = this._onSocketClosed.bind(this);
        this._onMessage = this._onMessage.bind(this);
        this._onSocketError = this._onSocketError.bind(this);
        this._onSocketOpen = this._onSocketOpen.bind(this);

        window.addEventListener('online', () => {
            this.isOnline = navigator.onLine;
            console.log('Socket: online');
            this.init();
        });

        window.addEventListener('offline', () => {
            this.isOnline = navigator.onLine;
            console.log('Socket: offline');
            this.reconnect();
        })
    },

    _ack: function(messageId) {
        this._websocket.send(JSON.stringify({
            type: `ack:${messageId}`,
            id: uuid.v5('0', window.performance.now()),
        }));
    },

    _onMessage: function(message) {
        message = JSON.parse(message.data);
        console.log('Socket: new message received', message.type, message);

        if (message.type.search('ack') < 0) {
            this._ack(message.id);
        }

        if (this._onceQueue[message.type]) {
            this._onceQueue[message.type].forEach(fn => fn(message));
            delete this._onceQueue[message.type];
        }

        if (this._listeners[message.type]) {
            this._listeners[message.type].forEach(fn => fn(message));
        }
    },

    _statusChange: function() {
        this._onStatusChange.forEach(fn => fn());
    },

    sendMessage: function(type, message) {
        if (this.isConnected) {
            let data = {
                id: uuid.v5('0', window.performance.now().toString()),
                data: message,
                type: type,
            };

            let promise = new Promise((success, failure) => {

                // wait for 10s before the connection times out
                let timeoutId = setTimeout(() => {
                    console.warn('Socket: connection timed out! dropping connection!');
                    failure();
                }, 10000);

                // clear the time out once we know the server got yout message.
                this.once(`ack:${data.id}`, () => {
                    clearTimeout(timeoutId);
                });

                // the server processed our message!
                this.once(`response:${data.id}`, message => {
                    success(message);
                });
            });

            // promise.catch(() => this.reconnect());

            console.log('Socket: message sent', data.type, data);
            this._websocket.send(JSON.stringify(data));

            return promise;
        } else {
            return Promise.reject('disconnected');
        }
    },

    reconnect: function() {
        if (this.isConnected) {
            this._websocket.close();
        }
    },

    /**
     * Callback for when the socket disconnected. A reconnect is scheduled emediately.
     *
     * @callback
     *
     * @return {void}
     */
    _onSocketClosed() {
        // socket closed restart
        this._hostId += 1;
        this._decelerateTimeout += 1;

        if (this._hostId > this._host.length - 1) {
            this._hostId = 0;
        }

        if (this._decelerateTimeout > this._decelerateMaxTimeout) {
            this._decelerateTimeout = this._decelerateMaxTimeout;
        }

        console.warn(`websocket disconnected! Retry in ${this._decelerateTimeout}s to ${this._host[this._hostId]}`);
        this.isConnected = false;
        this.init();
    },

    _onSocketError(error) {
        console.error('websocket error:', error);
        this.isConnecting = false;
    },

    _onSocketOpen() {
        this.isConnected = true;
        this.isConnecting = false;
        this._decelerateTimeout = 0;
        console.log('connection established!');

        this._connectedHandler.forEach(fn => fn());
    },

    init: function() {
        if (this.isOnline && !this.decelerate && !this._stop) {

            this.isConnecting = true;
            this._decelerate = setTimeout(() => {
                console.log('trying to establish a connection...');
                this._decelerate = null;
                this._websocket = new WebSocket(this._host[this._hostId], 'hwp-1.0');

                this._websocket.onopen = this._onSocketOpen;
                this._websocket.onerror = this._onSocketError;
                this._websocket.onclose = this._onSocketClosed;
                this._websocket.onmessage = this._onMessage;
            }, this._decelerateTimeout * 1000);
        }

        this._stop = false;
    },

    once: function(type, fn) {
        if (!this._onceQueue[type]) {
            this._onceQueue[type] = [];
        }

        this._onceQueue[type].push(fn);
    },

    on: function(type, fn) {
        if (!this._listeners[type]) {
            this._listeners[type] = [];
        }

        this._listeners[type].push(fn);
    },

    onStatusChange: function(fn) {
        this._onStatusChange.push(fn);
    },

    /**
     * [connected description]
     *
     * @param  {Function} fn [description]
     *
     * @return {void}      [description]
     */
    connected: function(fn) {
        this._connectedHandler.push(fn);
    },

    disconnect: function() {
        this._stop = true;
        this._websocket.close();
    }
};

export default Socket;
