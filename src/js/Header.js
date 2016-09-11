import DataBinding from '../af/modules/DataBinding.js';

/** @lends Header# */
let Header = {
    view: null,

    /** @type {application} */
    application: null,

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

    _make: function(application) {
        this.application = application;

        let scope = DataBinding.makeTemplate('#header-status', {
            view: this,
        }).scope;

        this.application.socket.onStatusChange(scope.__apply__.bind(scope, null, true));
    }
}

export default Header;
