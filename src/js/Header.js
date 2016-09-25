import DataBinding from '../af/modules/DataBinding.js';
import ViewController from './ViewController.js';

/** @lends Header# */
let Header = {
    view: null,

    /** @type {application} */
    application: null,

    _scope: null,

    get notConnected() {
        /** @type {Socket} */
        let socket = this.application.socket;

        return !socket.isOnline || !socket.isConnected;
    },

    get connected() {
        let socket = this.application.socket;

        return socket.isOnline && socket.isConnected;
    },

    get connectionStatus() {
        let socket = this.application.socket;

        if (!socket.isOnline) {
            return 'offline';
        } else if (!socket.isConnected && socket.isConnecting) {
            return 'connecting...';
        } else {
            return 'diconnected';
        }
    },

    get partner() {
        return this.application.account.getPartner();
    },

    isOnline(user) {
        let time = null;

        if (user) {
            time = Date.now() - user.lastSeen;

            let minutes = (time / 60000) | 0;
            let hours = (minutes / 60) | 0;
            let days = (hours / 24) | 0;

            if (minutes === 0) {
                time = 'a moment';
            } else if (minutes < 60) {
                time = `${minutes}m`;
            } else if (hours < 48) {
                minutes = minutes - (hours * 60);

                time = `${hours}h ${minutes}m`;
            } else {
                hours = hours - (days * 24);

                time = `${days}d ${hours}h`;
            }
        }

        if (user && user.online) {
            return 'online';
        } else if (time) {
            return `last seen ${time} ago`;
        } else {
            return 'away';
        }
    },

    refresh() {
        this._scope.__apply__(null, true);
    },

    _make: function(application) {
        this.application = application;

        this._scope = DataBinding.makeTemplate('#header-status', {
            view: this,
        }).scope;

        this.application.socket.onStatusChange(this._scope.__apply__);
        this.subscribe(this.application.account);

        setInterval(() => {
            this.refresh();
        }, 1000 * 60);
    },

    __proto__: ViewController,
}

export default Header;
