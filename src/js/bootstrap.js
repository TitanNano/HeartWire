import application from './main.js';
import Platform from './Platform';

let onDeviceReady = function() {
    application.init();
}


let deviceReady = new Promise((ready) => {
    if (Platform.isCordova) {
        document.addEventListener('deviceready', ready, false);
    } else if (document.readyState != 'loading') {
        onDeviceReady();
    } else {
        document.addEventListener('DOMContentLoaded', ready, false);
    }
});

let polymerReady = new Promise((ready) => {
    if (Platform.isPolymer) {
        window.Polymer.ImportStatus.whenReady(ready);
    }
});

Promise.all([deviceReady, polymerReady]).then(onDeviceReady);
