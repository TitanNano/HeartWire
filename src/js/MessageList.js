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
    },


    _fixMessageListScroll() {
        let messageList = this.messageListElement.parentElement;
        let lastMessage = this.messageListElement.lastElementChild;
        let messages = this.currentMessages;
        let force = (messages[messages.length - 1].inOrOut === 'out');

        if (force || messageList.scrollTop > (messageList.scrollHeight - messageList.clientHeight - 200)) {
            lastMessage.scrollIntoView();
        }
    },

    __proto__: ViewController,
};

export default MessageList;
