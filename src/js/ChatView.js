import { Make } from '../af/util/make.js';
import BottomInput from './BottomInput.js';
import DataBinding from '../af/modules/DataBinding.js';
import Header from './Header.js';
import MessageList from './MessageList.js';
import ViewController from './ViewController.js';

const ChatView = {

    /** @type {Application} */
    _app: null,

    /** @type {Acocunt} */
    account: null,

    /** @type {Header} */
    header: null,

    /** @type {MessageList} */
    messageList: null,

    /** @type {BottomInput} */
    bottomInput: null,

    get isVisible() {
        return this.account.isReady;
    },

    get isNotVisible() {
        return !this.account.isReady;
    },

    get partner() {
        return this.account && this.account.getPartner();
    },

    _make: function(app, account) {
        this._app = app;
        this.account = account;
        this._scope = DataBinding.makeTemplate('#chat-view', { view: this }).scope;

        this.header = Make(Header)(this._app);
        this.messageList = Make(MessageList)();
        this.bottomInput = Make(BottomInput)(account);

        this.subscribe(this.account);
    },

    __proto__: ViewController,
};

export default ChatView;
