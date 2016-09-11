
var onDeviceReady = function() {
    baiduPush.startWork('KGQvyGtzWRG6X48cSAwf5Mxk', baiduPushReady, baiduPushFailed);
    baiduPush.onMessage(messageArrived, baiduPushFailed);
    baiduPush.onNotificationArrived(messageArrived, baiduPushFailed);
}

var baiduPushReady = function(result) {
    console.log('baidu push:', result);
}

var baiduPushFailed = function(error) {
    console.log('baidu push [error]:', error);
}

var messageArrived = function(data) {
    console.log('baidu push [message]:', data);
}

if (!!window.cordova) {
    document.addEventListener('deviceready', onDeviceReady, false);
}
