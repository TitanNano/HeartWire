import { Make } from '../af/util/make.js';

let PushManager = Make(/** @lends PushManager */{

    platform: '',

    serviceStatus: '',

    _newPushHandler: null,
    _registerHandler: null,

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
        console.console.error('push service failed:', data);
    },

    _baiduHandleServiceReady: function(data) {
        this._register(data.clientId);

        this.serviceStatus = 'OK';
        console.log('baidu push is ready', data);
    },

    _handleMessageError: function(data) {
        console.error('push message error:', data);
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

    _register: function(token) {
        this._registerHandler.forEach(fn => fn(token));
    },

    _registerServiceSimple: function(force) {
        navigator.push.registrations().onsuccess = function(e) {
            if (e.target.result.length === 0 && force) {
                e.target.result.forEach(enpoint => navigator.push.unregister(enpoint));

                let request = navigator.push.register();
                request.onsuccess = this._simpleHandleServiceReady;
                request.onerror = this._handleServiceError;
            }
        };
    },

    init: function() {
        if (this.platform === 'android') {
            window.baiduPush.startWork('KGQvyGtzWRG6X48cSAwf5Mxk', this._baiduHandleServiceReady.bind(this), this._handleServiceError.bind(this));
            window.baiduPush.onNotificationArrived(this._newMessage.bind(this), this._handleMessageError.bind(this));
        } else if (this.platform === 'firefoxos') {
            this._registerServiceSimple();
            navigator.mozSetMessageHandler('push', this._newMessage.bind(this));
            navigator.mozSetMessageHandler('push-register', () => this._registerServiceSimple(true));
        }
    },

    onPush: function(fn) {
        this._newPusHandler.push(fn);
    },

    onRegister: function(fn) {
        this._registerHandler.push(fn);
    },

    setRegistrationFailed: function() {
        this.serviceStatus = 'unable to register push service';
    }
})();

export default PushManager;
