import MessageManager from './MessageManager';
import ScreenManager from './ScreenManager';

const NotificationManager = {

    _unreadCount: 0,
    _account: null,
    _lastPreview: 'test message haha',
    _notification: null,

    _digestMessages(chunk) {
        if (chunk) {
            let unreadCount = this._unreadCount;

            chunk.forEach(message => {
                if (message.to === this._account.id) {
                    this._unreadCount += 1;
                    this._lastPreview = message.preview;
                }
            });

            if (this._unreadCount > unreadCount) {
                this.notify();
            }
        }
    },

    notify(text) {
        if (ScreenManager.applicationIsActive) {
            navigator.vibrate([70, 30, 70]);
            this._unreadCount = 0;
        } else {
            text = text || (this._unreadCount > 1 ? `${this._unreadCount} Messages` : ( this._lastPreview + '...'));

            this._notification = new Notification(this._account.getPartner().name, {
                body: text,
                tag: this._account.partner,
                renotify: true,
                icon: './heartwire.png',
            });
        }
    },

    _clearUnreadStatus() {
        this._unreadCount = 0;
        this._notification && this._notification.close();
    },

    init(account) {
        this._account = account;
        MessageManager.on('change', this._digestMessages.bind(this));
        ScreenManager.on('active', this._clearUnreadStatus.bind(this));

        Notification.requestPermission();
    }
};

window.NotificationManager = NotificationManager;

export default NotificationManager;
