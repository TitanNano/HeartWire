import DataBinding from '../af/modules/DataBinding.js';
import MessageManager from './MessageManager.js';

let BottomInput = {
    currentDraft: '',

    get inputValue() {
        return this.currentDraft;

        // return this.inputFocused || this.currentDraft.length > 0 ?
        //    this.currentDraft : (this.inputElement && this.inputElement.getAttribute('placeholder'));
    },

    set inputValue(value) {
        this.currentDraft = value.replace(/(^<br>)/g, '');
    },

    inputFocused: false,

    get usePlaceholderClass() {
        let classes = '';

        classes += this.inputFocused ? ' focus' : '';
        classes += this.currentDraft.length === 0 ? ' placeholder': '';

        return classes;
    },

    get sendEnabled() {
        return this.currentDraft.length > 0;
    },

    /** @type HTMLDivElement */
    inputElement: null,

    inputFocusChange: function(event) {
        event.cancleRecycle();
        this.view.inputFocused = event.type === 'focus';
        this.__apply__(null, true);
    },

    /**
     * view event handler for sending messages
     *
     * @param {Event} e event
     *
     * @return {void}
     */
    sendMessage(e) {
        e.preventDefault();

        let messageText = this.view.inputValue.replace(/<br>/g, '\n');

        MessageManager.sendMessage('text', messageText, this.view._account.partner)

        this.view.currentDraft = '';
        this.__apply__();
    },

    _scope: null,
    _account: null,

    _make(account) {
        this._account = account;
        this._scope = DataBinding.makeTemplate('#bottom-input', { view: this });
    }
}

export default BottomInput;
