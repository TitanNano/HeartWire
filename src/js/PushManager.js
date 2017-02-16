import { Make } from '../af/util/make.js';

let PushManager = Make(/** @lends PushManager */{

    platform: '',

    serviceStatus: '',

    _newPushHandler: null,

    /**
     * [_acount description]
     *
     * @type {Account}
     */
    _account: null,

    /**
     * [_socket description]
     *
     * @type {Socket}
     */
    _socket: null,

    /**
     * [_handleServiceError description]
     *
     * @callback
     * @param  {Object} data [description]
     *
     * @return {void}      [description]
     */
    _handleServiceError: function(data) {
        this.serviceStatus = 'init failed';
        console.error('[PushManager]', 'push service failed:', data);
    },

    _baiduHandleServiceReady: function(event) {
        console.log('[PushManager]', 'baidu push is ready', event.data);
        this._register('BaiduPush', event.data.channelId).then(() => {
            this.serviceStatus = 'OK';
        });

        this.serviceStatus = 'pending';
    },

    _simpleHandleServiceReady(event) {
        console.log('[PushManager]', 'simple push is ready', event);
    },

    _handleMessageError: function(data) {
        console.error('[PushManager]', 'push message error:', data);
    },

    _make: function() {
        if (!!window.cordova && window.cordova.platformId === 'android') {
            this.platform = 'android';
        } else if (!!navigator.push) {
            this.platform = 'firefoxos';
        }

        this._newPushHandler = [];
        this._registerHandler = [];
    },

    _newMessage: function() {
        this._newPushHandler.forEach(fn => fn());
    },

    _register: function(type, token) {
        console.log('[PushManager]', 'trying to regitster for push...', token);

        return  this._account.whenAuthenticated
            .then(() => this._socket.sendMessage('account.push', {
                type: ['BaiduPush', 'SimplePush'].indexOf(type),
                token : token,
            }));
    },

    _registerServiceSimple: function(force) {
        navigator.push.registrations().onsuccess = function(e) {
            if (e.target.result.length === 0 && force) {
                e.target.result.forEach(enpoint => navigator.push.unregister(enpoint));

                let request = navigator.push.register();
                request.onsuccess = this._simpleHandleServiceReady.bind(this);
                request.onerror = this._handleServiceError.bind(this);
            }
        };
    },

    /**
     * [init description]
     *
     * @param  {Account} account [description]
     * @param  {Socket} socket  [description]
     *
     * @return {void}
     */
    init: function(account, socket) {
        this._account = account;
        this._socket = socket;

        this._account.whenReady.then(() => {
            if (!this._account.isPushRegistered) {
                if (this.platform === 'android') {
                    window.baiduPush.startWork('KGQvyGtzWRG6X48cSAwf5Mxk', this._baiduHandleServiceReady.bind(this), this._handleServiceError.bind(this));
                    window.baiduPush.onNotificationArrived(this._newMessage.bind(this), this._handleMessageError.bind(this));
                } else if (this.platform === 'firefoxos') {
                    this._registerServiceSimple();
                    navigator.mozSetMessageHandler('push', this._newMessage.bind(this));
                    navigator.mozSetMessageHandler('push-register', () => this._registerServiceSimple(true));
                }
            }
        });
    },

    onPush: function(fn) {
        this._newPusHandler.push(fn);
    },

    setRegistrationFailed: function() {
        this.serviceStatus = 'unable to register push service';
    }
})();

export default PushManager;
