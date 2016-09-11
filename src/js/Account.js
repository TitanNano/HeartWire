import { Make } from '../af/util/make.js';
import EventTarget from '../af/core/prototypes/EventTarget';

const Account = Make(/** @lends Account# */{

    /**
     * [_socket description]
     *
     * @type {Socket}
     */
    _socket: null,
    _userData: null,

    credentialsReady: false,
    busy: false,

    get isReady() {
        return !!this._userData;
    },

    _make: function(socket) {
        EventTarget._make.apply(this);

        let [username, password] = this._credentials;

        this._socket = socket;

        if (username && password) {
            this.credentialsReady = true;
            this._socket.init();
        }

        this._socket.connected(() => {
            let [username, password] = this._credentials;

            if (username && password) {
                this._socket.sendMessage('authentication', {
                    username: username,
                    password: password
                }).then(response => {
                    if (response.data.error) {
                        return Promise.reject(response);
                    } else {
                        return response;
                    }
                }).then(({ data: user }) => {
                    console.log('Account: user ', user, 'sucessfully logged in');

                    this._userData = user;
                    this.busy = false;
                    this.emit('statusChange');
                }).catch(error => {
                    console.error('login faild! reason:', error.data.reason);

                    this.credentialsReady = false;
                    this.busy = false;
                    window.localStorage.removeItem('heartwire.username');
                    window.localStorage.removeItem('heartwire.password');
                    this._socket.disconnect();
                    this.emit('statusChange');
                });
            }
        });
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
        this._socket.init();
    },

    get _credentials() {
        let username = window.localStorage.getItem('heartwire.username');
        let password = window.localStorage.getItem('heartwire.password');

        return [username, password];
    }

}, EventTarget).get();

export default Account;
