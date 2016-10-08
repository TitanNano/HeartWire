import DataBinding from '../af/modules/DataBinding.js';
import MessageManager from './MessageManager.js';
import ViewController from './ViewController.js';

let MessageList = {

    /** @type module:DataBinding.ScopePrototype */
    _scope: null,

    /** @type HTMLElement */
    messageListElement: null,

    get currentMessages() {
        return MessageManager.messages;
    },

    _make: function() {
        this._scope = DataBinding.makeTemplate('#message-list', { view: this }).scope;
        this.subscribe(MessageManager);

        this._scope.__watch__('view.messageListElement.childElementCount', (value) => {
            console.log('message list length:', value);

            if (value > 0) {
                this._fixMessageListScroll();
            }
        });

        window.addEventListener('resize', () => this._fixMessageListScroll(true));
    },


    _fixMessageListScroll(force) {
        let messageList = this.messageListElement.parentElement;
        let lastMessage = this.messageListElement.lastElementChild;
        let messages = this.currentMessages;

        force = force || (messages[messages.length - 1].inOrOut === 'out');

        if (force || messageList.scrollTop > (messageList.scrollHeight - messageList.clientHeight - 500)) {
            lastMessage && lastMessage.scrollIntoView();
        }
    },

    isSending(message) {
        return message.status === 'sending';
    },

    formatDate(date) {
        if (typeof date === 'string') {
            date = new Date(date);
        }

        let rightNow = new Date();
        let formatConfig = {
            localeMatcher: 'lookup',
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
        };

        if (rightNow.getFullYear() > date.getFullYear()) {
            formatConfig.year = 'numeric';
        }

        if (rightNow.getMonth() > date.getMonth() || rightNow.getDate() > date.getDate()) {
            formatConfig.month = '2-digit';
            formatConfig.day = '2-digit';
        }

        if (date.toDateString() === 'Invalid Date') {
            return '';
        }

        return Intl.DateTimeFormat([], formatConfig).format(date);
    },

    __proto__: ViewController,
};

export default MessageList;
