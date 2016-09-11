import application from './main.js';

let onDeviceReady = function() {
    application.init();
}


let deviceReady = new Promise((ready) => {
    if (!!window.cordova) {
        document.addEventListener('deviceready', ready, false);
    } else if (document.readyState != 'loading') {
        onDeviceReady();
    } else {
        document.addEventListener('DOMContentLoaded', ready, false);
    }
});

let polymerReady = new Promise((ready) => {
    if (window.Polymer && window.Polymer.ImportStatus._ready) {
        window.Polymer.ImportStatus.whenReady(ready);
    } else {
        window.addEventListener('WebComponentsReady', ready);
    }
});

Promise.all([deviceReady, polymerReady]).then(onDeviceReady);
