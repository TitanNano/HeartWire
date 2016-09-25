import { Make } from '../af/util/make.js';
import EventTarget from '../af/core/prototypes/EventTarget';
import ScreenManager from './ScreenManager.js';
import Storage from './Storage.js';

const Account = Make(/** @lends Account# */{

    /**
     * [_socket description]
     *
     * @type {Socket}
     */
    _socket: null,
    _userData: null,
    _partnerData: null,

    credentialsReady: false,
    busy: false,
    lastError: '',

    get isReady() {
        return !!this._userData;
    },

    get partner() {
        return this._userData.partner;
    },

    get id() {
        return this._userData._id;
    },

    get color() {
        return this._userData && this._userData.color;
    },

    _make(socket) {
        EventTarget._make.apply(this);

        let [username, password] = this._credentials;

        this._socket = socket;

        if (username && password) {
            this.credentialsReady = true;
            this._socket.init();
        }

        if (username) {
            Storage.getUserDataByUserName(username).then(user => {
                if (user && !this._userData) {
                    this._userData = user;

                    this.emit('ready');
                }
            });
        }

        this._socket.connected(this._socketConnected.bind(this));
        this._socket.on('partnerStatusChanged', this._partnerStatusChanged.bind(this));
        ScreenManager.on('active', this._userIsOnline.bind(this));
        ScreenManager.on('inactive', this._userIsAway.bind(this));
    },

    _loadPartner() {
        Storage.getUserDataById(this._userData.partner).then(user => {
            if (!this._partnerData) {
                this._partnerData = user;
                this.emit('change');
            }
        });

        this._socket.sendMessage('account.partner').then(({ data: partner }) => {
            Storage.setUserData(partner);
            this._partnerData = partner;
            this.emit('change');
        });
    },

    _socketConnected() {
        let [username, password] = this._credentials;

        if (username && password) {
            this._socket.sendMessage('authentication', {
                username: username,
                password: password
            })
            .then(response => {
                if (response.data.error) {
                    return Promise.reject(response);
                } else {
                    return response;
                }
            })
            .then(this._authSuccess.bind(this))
            .catch(this._authError.bind(this));
        }
    },

    _authSuccess({ data: user }) {
        let wasReady = !!this._userData;
        console.log('Account: user ', user, 'sucessfully logged in');

        this._userData = user;
        this.busy = false;

        Storage.setUserData(user);
        this._loadPartner();

        if (ScreenManager.applicationIsActive) {
            this._userIsOnline();
        }

        this.emit('statusChange');
        this.emit('change');
        console.log('account listeners:', JSON.stringify(this._listeners.authenticated));
        this.emit('authenticated');

        if (!wasReady) {
            this.emit('ready');
        }
    },

    _authError(error) {
        console.error('login faild! reason:', error.data.reason);

        this.credentialsReady = false;
        this.busy = false;
        this.lastError = error.data.reason;
        window.localStorage.removeItem('heartwire.username');
        window.localStorage.removeItem('heartwire.password');
        this._socket.disconnect();
        this.emit('statusChange');
    },

    _userIsOnline() {
        if (this._userData) {
            this._socket.sendMessage('account.online', true).then(({ data: userData }) => {
                this._userData = userData;
            });
        }
    },

    _userIsAway() {
        if (this._userData) {
            this._socket.sendMessage('account.online', false).then(({ data: userData }) => {
                this._userData = userData;
            });
        }
    },

    _partnerStatusChanged({ data: { online, lastSeen } }) {
        this._partnerData.online = online;
        this._partnerData.lastSeen = lastSeen;
        this.emit('change');
    },

    /**
     * [authenticate description]
     *
     * @param  {string} username [description]
     * @param  {string} password [description]
     *
     * @return {Promise}          [description]
     */
    authenticate: function(username, password) {
        password = btoa(password);

        window.localStorage.setItem('heartwire.username', username);
        window.localStorage.setItem('heartwire.password', password);

        this.credentialsReady = true;
        this.busy = true;
        this.lastError = '';
        this._socket.init();
    },

    get _credentials() {
        let username = window.localStorage.getItem('heartwire.username');
        let password = window.localStorage.getItem('heartwire.password');

        return [username, password];
    },

    setSyncChallenge: function(value) {
        return this._socket.sendMessage('account.syncChallenge', {
            syncChallenge: value,
        }).then(({ data: user }) => {
            this._userData = user;
        }).catch(e => console.log(`${e.data.error}:`, e.data.reason));
    },

    checkSyncChanllenge: function() {
        return this._userData.syncChallenge;
    },

    getPartner() {
        return this._partnerData;
    }

}, EventTarget).get();

export default Account;
