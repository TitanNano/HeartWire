import DataBinding from '../af/modules/DataBinding.js';

const LoginDialog = {

    /** @type module:DataBinding.ScopePrototype */
    _scope: null,
    _account: null,

    get active() {
        return this._account.busy;
    },

    /**
     * [userNameField description]
     *
     * @type {HTMLInputElement}
     */
    userNameField: null,

    /**
     * [passwordField description]
     *
     * @type {HTMLInputElement}
     */
    passwordField: null,

    username: '',
    password: '',

    usernameError: '',
    passwordError: '',

    get isOpen() {
        return (!this._account.credentialsReady || this.active);
    },

    get isNotActive() {
        return !this.active;
    },

    get isValid() {
        return this.usernameField.validate() && this.passwordField.validate();
    },

    _make: function(account) {
        this._scope = DataBinding.makeTemplate('#login-dialog', { view: this }).scope;
        this._account = account;

        this._account.on('statusChange', this._scope.__apply__.bind(this._scope));
    },

    login: function() {
        if (this.view.isValid) {
            this.view._account.authenticate(this.view.username, this.view.password);
        }
    },

    getErrorMessage(element, error) {
        element = element.querySelector('input');

        return element.validationMessage || error;
    },

    preventDefault: function(event) {
        event.preventDefault();
    }

};

export default LoginDialog;
