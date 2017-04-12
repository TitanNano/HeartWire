import CappedArray from './CappedArray.js';
import CryptoProxy from './CryptoProxy.js';
import EventTarget from '../af/core/prototypes/EventTarget.js';
import Message from './Message.js';
import Storage from './Storage.js';

const MessageManager = {

    /** @type {Socket} */
    _socket: null,

    _loadedMessages: Object.create(CappedArray).constructor(50),
    _pendingMessages: [],

    _account: null,

    _socket: null,

    _mapMessages(chunk) {
        if (Array.isArray(chunk)) {
            return chunk.map(message => Object.create(Message).constructor(message, this._account));
        } else {
            let stackTrace = null;
            let name = null;

            try { throw new Error(); } catch (e) { stackTrace = e.stack }

            stackTrace = stackTrace.split('\n');
            name = stackTrace.shift();

            console.warn('invalid call of', name, 'at \n', stackTrace.join('\n'));
        }
    },

    _decryptMessages(chunk) {
        return Promise.all(chunk.map(message => {
            return CryptoProxy.decryptMessage(message.body).then(body => {
                message.body = body;
                return message;
            });
        }));
    },

    constructor() {
        super._make();

        this._mapMessages = this._mapMessages.bind(this);

        return this;
    },

    _getLatestMessageId() {
        return Storage.getMessages(this._account.partner).then(chunk => (chunk[0] && chunk[0]._id) || 0);
    },

    _fetchLatestMessages() {
        return this._getLatestMessageId().then(messageId => {
            return this._socket.sendMessage('account.syncMessages', messageId)
        })
        .then(messages => this._decryptMessages(messages.data))
        .then(chunk => this._mapMessages(chunk))
        .then(list => {
            list.forEach(message => {
                Storage.storeMessage(message.export());

                for (let i = this._loadedMessages.length -1; i > 0; i--) {
                    if (this._loadedMessages.getItem(i)._id === message._id) {
                        return;
                    }
                }

                this._loadedMessages.push(message);
            });

            this.emit('change', list);
        });
    },

    get messages() {
        return this._loadedMessages.getList()
            .concat(this._pendingMessages);
    },


    _loadLatestMessages() {
        Storage.getMessages(this._account.partner).then(chunk => {
            this._loadedMessages.push(...this._mapMessages(chunk.reverse()));
            this.emit('change');
        });
    },

    init(account, socket) {
        this._account = account;
        this._socket = socket;

        this._account.on('ready', () => {
            this._loadLatestMessages();
        });

        this._socket.on('newMessage', () => {
            this._fetchLatestMessages();
        });

        CryptoProxy.on('ready', () => this._fetchLatestMessages());
    },

    sendMessage(type, content, to) {
        // create new message
        let message = Object.create(Message).constructor({
            from: this._account.id,
            to: to,
        }, this._account);

        let promise = null;

//      encrypt message
        if (type === 'text') {
            message.body = content,
            message.preview = content.substring(0, 15);

            let messageData = message.export();

            promise = CryptoProxy.encryptMessage(content).then(body => {
                messageData.body = body;

                // send message
                return this._socket.sendMessage('account.sendTextMessage', messageData);
            });
        }

        //mark message as sending
        message.status = 'sending';

        //push message temporaly into view
        this._pendingMessages.push(message);

        promise.then(({ data: result }) => {
            console.log('messagStatus:', result);

            // sending was successful. dowload latest messages
            if (result.status) {
                return this._fetchLatestMessages();
            }
        }).then(() => {

            // got latest messages, remove placeholder
            this._pendingMessages.splice(this._pendingMessages.indexOf(message), 1);
            this.emit('change');
        }).catch(reason => {
            console.error('failed to send message', reason);
        });

        return promise;
    },

    __proto__: EventTarget,

};

window.MessageManager = MessageManager;

export default MessageManager.constructor();
