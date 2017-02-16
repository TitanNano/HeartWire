const Platform = {
    get isCordova() {
        return !!window.cordova;
    },

    get isFirefoxOS() {
        return !!navigator.push;
    },

    get hasNotificationPermission() {
        return Notification.permission !== 'granted';
    },

    get isPolymer() {
        return !!window.Polymer;
    },

    get isPolymerReady() {
        return !!window.Polymer.ImportStatus._ready;
    }
};

export default Platform;
