import { Make } from '../af/util/make.js';
import Account from './Account.js';
import Application from '../af/core/prototypes/Application.js';
import ChatView from './ChatView.js';
import CryptoProxy from './CryptoProxy.js';
import LoginDialog from './LoginDialog.js';
import MessageManager from './MessageManager.js';
import NotificationManager from './NotificationManager.js';
import PushManager from './PushManager.js';
import ScreenManager from './ScreenManager.js';
import Socket from './Socket.js';
import Storage from './Storage.js';
import SyncDialog from './SyncDialog.js';
import RenderEngine from '../af/modules/DataBinding/RenderEngine';

let application = Object.create({
    name: 'HeartWire',

    socket: null,

    headerController: null,
    bottomInputController: null,
    messageListController: null,
    loginDialog: null,
    storage: Storage,

    constructor() {
        super._make();

        this.sreeenManager = ScreenManager;

        this.socket = Make(Socket)({
            host: [
//                'ws://localhost:5000/socket',
//                'ws://192.168.44.231:5000/socket',
//                'ws://192.168.178.25:5000/socket',
                'wss://heartwire.herokuapp.com/socket',
            ]
        });

        this.account = Make(Account)(this.socket);

        this.chatView = Make(ChatView)(this, this.account);
        this.loginDialog = Make(LoginDialog)(this.account);
        this.syncDialog = Make(SyncDialog)();

        MessageManager.init(this.account, this.socket);
        NotificationManager.init(this.account);

        return this;
    },

    init() {
        RenderEngine.schedulePostRenderTask(() => setTimeout(() => ScreenManager.notifyScreenReady(), 300));

        PushManager.init(this.account, this.socket);
        CryptoProxy.init(this.account, this.socket);
    },

    __proto__: Application,

}).constructor();

export default application;
