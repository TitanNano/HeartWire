import CryptoProxy from '../js/CryptoProxy.js';
import DataBinding from '../af/modules/DataBinding.js';


let SyncDialog = {

    /** @type {module:DataBinding.ScopePrototype} */
    _scope: null,

    currentStatus: null,
    passphrase: '',

    get isOpen() {
        return CryptoProxy.syncRequired;
    },

    get busy() {
        return CryptoProxy.syncing;
    },

    _make: function() {
        this._scope = DataBinding.makeTemplate('#sync-dialog', { view: this }).scope;

        CryptoProxy.on('syncRequired', this._syncRequired.bind(this));
        CryptoProxy.on('syncStatus', this._syncStatusChanged.bind(this));
    },

    _syncStatusChanged: function(status) {
        if (status === 'done') {
            this.currentStatus = null;
        } else {
            this.currentStatus = status;
        }

        this._scope.__apply__();
    },

    _syncRequired: function(reason) {
        this.currentStatus = reason;

        this._scope.__apply__();
    },

    /**
     * startSync event handler
     *
     * @return {void}
     */
    startSync: function() {
        this.view.currentStatus = null;
        CryptoProxy.sync(this.view.passphrase);
    },

    not: function(value) {
        return !value;
    }
};

export default SyncDialog;
