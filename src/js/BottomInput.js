import DataBinding from '../af/modules/DataBinding.js';
import MessageManager from './MessageManager.js';

let BottomInput = {
    currentDraft: '',

    get inputValue() {
        return this.currentDraft.length > 0 ? this.currentDraft : '<br>';

        // return this.inputFocused || this.currentDraft.length > 0 ?
        //    this.currentDraft : (this.inputElement && this.inputElement.getAttribute('placeholder'));
    },

    set inputValue(value) {
        this.currentDraft = value.replace(/(^<br>|<br>)$/g, '');
    },

    inputFocused: false,

    get usePlaceholderClass() {
        return (!this.inputFocused && this.currentDraft.length === 0) ? 'placeholder': '';
    },

    /** @type HTMLDivElement */
    inputElement: null,

    inputFocusChange: function(event) {
        event.cancleRecycle();
        this.view.inputFocused = event.type === 'focus';
        this.__apply__(null, true);
    },

    sendMessage() {
        let messageText = this.view.inputValue;

        MessageManager.sendMessage('text', messageText, this.view._account.partner)
            .then(() => {
                this.view.currentDraft = '';
                this.__apply__();
            });
    },

    _scope: null,
    _account: null,

    _make(account) {
        this._account = account;
        this._scope = DataBinding.makeTemplate('#bottom-input', { view: this });
    }
}

export default BottomInput;
