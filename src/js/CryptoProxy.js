import { Make } from '../af/util/make.js';
import { sha256Native } from '../af/modules/sha-256.js';
import EventTarget from '../af/core/prototypes/EventTarget';
import { hashToBuffer } from '../af/modules/sha-1';

const bufferToHex = function(buffer) {
    return buffer.reduce((prev, byte) => prev += ('00' + byte.toString(16)).slice(-2), '');
}

const CryptoProxy = Make({

    /** @type {Account} */
    _account: null,

    /** @type {WebSocket} */
    _socket: null,

    /** @type {string} */
    _cryptoKey: null,

    syncing: false,
    syncRequired: false,

    RAW_CHALLENGE: 'heartwire SyncChallenge solved',

    init: function(account, socket) {
        this._account = account;
        this._socket = socket;
        this._account.on('authenticated', this._checkSync.bind(this));

        this._socket.on('partnerSyncStatus', this._partnerStatusChanged.bind(this));
    },

    _checkSync: function() {
        let reason, ready = null;

        if (this.syncing) {
            this.syncing = false;
            reason = 'You got disconnected while syncing, please re-try now.';
        }

        this._cryptoKey = window.localStorage.getItem('heartwire.cryptoKey')
        ready = !!this._cryptoKey;

        if (!ready) {
            this.syncRequired = true;
//            this._account.setSyncChallenge(null);
            this.emit('syncRequired', reason);
        } else {
            this.emit('ready');
        }
    },

    _partnerStatusChanged: function({ data: partner }) {
        if (partner.status === 'ready') {
            this._solveChallenge(partner.challenge).then(() => {
                this.syncRequired = false;
                this.syncing = false;

                window.localStorage.setItem('heartwire.cryptoKey', this._cryptoKey);

                this.emit('syncStatus', 'done');
                this.emit('ready');
            }).catch(() => {
                this.syncing = false;
                this._cryptoKey = null;
                this._account.setSyncChallenge(null);
                this.emit('syncStatus', 'synchronization failed! You need to choose the same passphrase as your partner!');
            });
        } else {
            this.emit('syncStatus', partner.reason);
        }
    },

    _readStringToBuffer: function(value) {
        let bufferView = (new TextEncoder('utf-8')).encode(value);

        return bufferView.buffer;
    },

    _readStringFromBuffer: function(buffer) {
        //read message from buffer
        return (new TextDecoder('utf-8')).decode(buffer);
    },

    sync: function(passphrase) {
        this.syncing = true;

        // hash the passphrase
        sha256Native(btoa(passphrase)).then(key => {
            this._cryptoKey = key;

            // create a sync challenge for partner
            return this.encryptMessage(this.RAW_CHALLENGE);
        }).then(challenge => {
            return this._account.setSyncChallenge(challenge);
        }).then(() => {
            this._socket.sendMessage('partner.getSyncChallenge');
        });
    },

    encryptMessage: function(rawMessage) {
        if (this._cryptoKey) {
            let iv = crypto.getRandomValues(new Uint8Array(16));

            return window.crypto.subtle.importKey('raw', hashToBuffer(this._cryptoKey), 'AES-CBC', false, ['encrypt', 'decrypt'])
                .then(key => {
                    return window.crypto.subtle.encrypt({ name: 'AES-CBC', iv: iv }, key, this._readStringToBuffer(rawMessage));
                }).then(messageBuffer => {
                    messageBuffer = new Uint8Array(messageBuffer);

                    let message = bufferToHex(messageBuffer);
                             iv = bufferToHex(iv);

                    message = btoa(iv + message);

                    return message;
                }).catch(e => console.log(e));
        } else {
            console.error('CryptoProxy:', 'no encrytion key set! unable to encrypt message!');
            return Promise.reject('no cryptoKey');
        }
    },

    _importKey: function(hashedPassphrase) {
        return window.crypto.subtle.importKey('raw', hashToBuffer(hashedPassphrase), 'AES-CBC', false, ['encrypt', 'decrypt']);
    },

    decryptMessage: function(messageData) {
        if (this._cryptoKey) {
            messageData = atob(messageData);

            // split message data into iv and message parts, then read the hexstring into a buffer.
            let iv = hashToBuffer(messageData.substring(0, 32));
            let messageBuffer = hashToBuffer(messageData.substring(32));

            return this._importKey(this._cryptoKey).then(key => {
                    return window.crypto.subtle.decrypt({ name: 'AES-CBC', iv: iv }, key, messageBuffer);
                }).then(messageBuffer => {
                    return this._readStringFromBuffer(messageBuffer);
                }).catch((e) => {
                    console.log('CryptoProxy:', 'decryption error,', e);

                    return e;
                });
        } else {
            console.error('CryptoProxy:', 'no encryption key set! unable to decrypt message!');
            return Promise.reject('no cryptoKey');
        }
    },

    _solveChallenge: function(challenge) {
        return this.decryptMessage(challenge).then(message => {
            if (message === this.RAW_CHALLENGE) {
                return true;
            } else {
                return Promise.reject('wrong key');
            }
        })
    }
}, EventTarget)();

export default CryptoProxy;
