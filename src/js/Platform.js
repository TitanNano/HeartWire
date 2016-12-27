const Platform = {
    get isCordova() {
        return !!window.cordova;
    },

    get hasNotificationPermission() {
        return Notification.permission !== 'granted';
    }
};

export default Platform;
