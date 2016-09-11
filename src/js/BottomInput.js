import DataBinding from '../af/modules/DataBinding.js';

let BottomInput = {
    currentDraft: '',

    get inputValue() {
        return this.inputFocused || this.currentDraft.length > 0 ?
            this.currentDraft : (this.inputElement && this.inputElement.getAttribute('placeholder'));
    },

    set inputValue(value) {
        this.currentDraft = value;
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

    scope: null,

    _make: function() {
        this.scope = DataBinding.makeTemplate('#bottom-input', { view: this });
    }
}

export default BottomInput;
