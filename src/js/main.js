import { Make } from '../af/util/make.js';
import Account from './Account.js';
import Application from '../af/core/prototypes/Application.js';
import BottomInput from './BottomInput.js';
import Header from './Header.js';
import LoginDialog from './LoginDialog.js';
import MessageList from './MessageList.js';
import PushManager from './PushManager.js';
import ScreenManager from './ScreenManager.js';
import Socket from './Socket.js';

let application = Make({
    name: 'HeartWire',

    pushManager: null,
    socket: null,

    headerController: null,
    bottomInputController: null,
    messageListController: null,
    loginDialog: null,

    _make: function() {
        this.pushManager = PushManager;
        this.sreeenManager = ScreenManager;

        this.socket = Make(Socket)({
            host: [
                'localhost:5000',
                '192.168.44.210:5000',
                '192.168.44.231:5000',
                '192.168.178.25:5000',
            ]
        });

        this.account = Make(Account)(this.socket);

        this.headerController = Make(Header)(this);
        this.bottomInputController = Make(BottomInput)();
        this.messageListController = Make(MessageList)();
        this.loginDialog = Make(LoginDialog)(this.account);
    },

    init: function() {
        this.pushManager.init();
    },

}, Application)();

export default application;
