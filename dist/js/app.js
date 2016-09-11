/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _main = __webpack_require__(1);
	
	var _main2 = _interopRequireDefault(_main);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var onDeviceReady = function onDeviceReady() {
	    _main2.default.init();
	};
	
	var deviceReady = new Promise(function (ready) {
	    if (!!window.cordova) {
	        document.addEventListener('deviceready', ready, false);
	    } else if (document.readyState != 'loading') {
	        onDeviceReady();
	    } else {
	        document.addEventListener('DOMContentLoaded', ready, false);
	    }
	});
	
	var polymerReady = new Promise(function (ready) {
	    if (window.Polymer && window.Polymer.ImportStatus._ready) {
	        window.Polymer.ImportStatus.whenReady(ready);
	    } else {
	        window.addEventListener('WebComponentsReady', ready);
	    }
	});
	
	Promise.all([deviceReady, polymerReady]).then(onDeviceReady);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _make2 = __webpack_require__(2);
	
	var _Account = __webpack_require__(3);
	
	var _Account2 = _interopRequireDefault(_Account);
	
	var _Application = __webpack_require__(5);
	
	var _Application2 = _interopRequireDefault(_Application);
	
	var _BottomInput = __webpack_require__(9);
	
	var _BottomInput2 = _interopRequireDefault(_BottomInput);
	
	var _Header = __webpack_require__(33);
	
	var _Header2 = _interopRequireDefault(_Header);
	
	var _LoginDialog = __webpack_require__(34);
	
	var _LoginDialog2 = _interopRequireDefault(_LoginDialog);
	
	var _MessageList = __webpack_require__(35);
	
	var _MessageList2 = _interopRequireDefault(_MessageList);
	
	var _PushManager = __webpack_require__(36);
	
	var _PushManager2 = _interopRequireDefault(_PushManager);
	
	var _ScreenManager = __webpack_require__(37);
	
	var _ScreenManager2 = _interopRequireDefault(_ScreenManager);
	
	var _Socket = __webpack_require__(38);
	
	var _Socket2 = _interopRequireDefault(_Socket);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var application = (0, _make2.Make)({
	    name: 'HeartWire',
	
	    pushManager: null,
	    socket: null,
	
	    headerController: null,
	    bottomInputController: null,
	    messageListController: null,
	    loginDialog: null,
	
	    _make: function _make() {
	        this.pushManager = _PushManager2.default;
	        this.sreeenManager = _ScreenManager2.default;
	
	        this.socket = (0, _make2.Make)(_Socket2.default)({
	            host: ['localhost:5000', '192.168.44.210:5000', '192.168.44.231:5000', '192.168.178.25:5000']
	        });
	
	        this.account = (0, _make2.Make)(_Account2.default)(this.socket);
	
	        this.headerController = (0, _make2.Make)(_Header2.default)(this);
	        this.bottomInputController = (0, _make2.Make)(_BottomInput2.default)();
	        this.messageListController = (0, _make2.Make)(_MessageList2.default)();
	        this.loginDialog = (0, _make2.Make)(_LoginDialog2.default)(this.account);
	    },
	
	    init: function init() {
	        this.pushManager.init();
	    }
	
	}, _Application2.default)();
	
	exports.default = application;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * The make module consits of Make, getPrototypeOf and mixin.
	 * See the documentation for each method to see what is does.
	 * This module is part of the ApplicationFrame.
	 * @module Make
	 * @author Jovan Gerodetti
	 * @copyright Jovan Gerodetti
	 * @version 1.0
	 */
	
	/**
	 * Internal function to apply one objects propteries to a target object.
	 *
	 * @param {Object} target
	 * @param {Object} source
	 * @inner
	 */
	var apply = function apply(target, source) {
	    Object.keys(source).forEach(function (key) {
	        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
	    });
	
	    return target;
	};
	
	/**
	 * Creates a new object with the given prototype.
	 * If two arguments are passed in, the properties of the first object will be
	 * applied to the new object.
	 *
	 * @param {Object} object
	 * @param {Object} prototype
	 * @return {function}
	 */
	var Make = exports.Make = function Make(object, prototype) {
	    if (arguments.length < 2) {
	        prototype = object;
	        object = null;
	    }
	
	    if (object === null) {
	        object = Object.create(prototype);
	    } else {
	        object = apply(Object.create(prototype), object);
	    }
	
	    var m = function m() {
	        var make = object.make || object._make || function () {};
	
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }
	
	        make.apply(object, args);
	
	        return object;
	    };
	
	    m.get = function () {
	        return object;
	    };
	
	    return m;
	};
	
	/**
	 * This method checks if the given prototype is in the prototype chain of
	 * the given target object.
	 *
	 * @param {Object} object
	 * @param {Object} prototype
	 * @return {boolean}
	 */
	var hasPrototype = exports.hasPrototype = function hasPrototype(object, prototype) {
	    var p = Object.getPrototypeOf(object);
	
	    while (p !== null && p !== undefined) {
	        if (typeof prototype == 'function') prototype = prototype.prototype;
	
	        if (p == prototype) return true;else p = Object.getPrototypeOf(p);
	    }
	
	    return false;
	};
	
	/**
	 * Creates a new prototype mixing all the given prototypes. Incase two or more
	 * prototypes contain the same propterty, the new prototype will return
	 * the propterty of the first prototype in the list which contains it.
	 *
	 * @param {...Object} prototypes - the porotype object to combine
	 * @return {Proxy} - the resulting proxy object
	 */
	var Mixin = exports.Mixin = function Mixin() {
	    for (var _len2 = arguments.length, prototypes = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        prototypes[_key2] = arguments[_key2];
	    }
	
	    return new Proxy(prototypes, MixinTrap);
	};
	
	/**
	 * Internal function to find a proptery in a list of prototypes.
	 *
	 * @param {Object[]} prototypes
	 * @param {string} key
	 * @return {Object}
	 */
	var findProperty = function findProperty(prototypes, key) {
	    for (var i = 0; i < prototypes.length; i++) {
	        var item = prototypes[i];
	
	        if (item && item[key]) {
	            return item;
	        }
	    }
	
	    return undefined;
	};
	
	/**
	 * Traps to create a mixin.
	 */
	var MixinTrap = {
	
	    'get': function get(prototypes, key) {
	        var object = findProperty(prototypes, key);
	
	        if (object && typeof object[key] === 'function') {
	            return object[key].bind(object);
	        }
	
	        return object ? object[key] : null;
	    },
	
	    'set': function set(prototypes, key, value) {
	        var object = findProperty(prototypes, key);
	
	        if (object) {
	            object[key] = value;
	        } else {
	            prototypes[0][key] = value;
	        }
	
	        return true;
	    }
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _make2 = __webpack_require__(2);
	
	var _EventTarget = __webpack_require__(4);
	
	var _EventTarget2 = _interopRequireDefault(_EventTarget);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Account = (0, _make2.Make)( /** @lends Account# */{
	
	    /**
	     * [_socket description]
	     *
	     * @type {Socket}
	     */
	    _socket: null,
	    _userData: null,
	
	    credentialsReady: false,
	    busy: false,
	
	    get isReady() {
	        return !!this._userData;
	    },
	
	    _make: function _make(socket) {
	        var _this = this;
	
	        _EventTarget2.default._make.apply(this);
	
	        var _credentials = _slicedToArray(this._credentials, 2);
	
	        var username = _credentials[0];
	        var password = _credentials[1];
	
	
	        this._socket = socket;
	
	        if (username && password) {
	            this.credentialsReady = true;
	            this._socket.init();
	        }
	
	        this._socket.connected(function () {
	            var _credentials2 = _slicedToArray(_this._credentials, 2);
	
	            var username = _credentials2[0];
	            var password = _credentials2[1];
	
	
	            if (username && password) {
	                _this._socket.sendMessage('authentication', {
	                    username: username,
	                    password: password
	                }).then(function (response) {
	                    if (response.data.error) {
	                        return Promise.reject(response);
	                    } else {
	                        return response;
	                    }
	                }).then(function (_ref) {
	                    var user = _ref.data;
	
	                    console.log('Account: user ', user, 'sucessfully logged in');
	
	                    _this._userData = user;
	                    _this.busy = false;
	                    _this.emit('statusChange');
	                }).catch(function (error) {
	                    console.error('login faild! reason:', error.data.reason);
	
	                    _this.credentialsReady = false;
	                    _this.busy = false;
	                    window.localStorage.removeItem('heartwire.username');
	                    window.localStorage.removeItem('heartwire.password');
	                    _this._socket.disconnect();
	                    _this.emit('statusChange');
	                });
	            }
	        });
	    },
	
	    /**
	     * [authenticate description]
	     *
	     * @param  {string} username [description]
	     * @param  {string} password [description]
	     *
	     * @return {Promise}          [description]
	     */
	    authenticate: function authenticate(username, password) {
	        password = btoa(password);
	
	        window.localStorage.setItem('heartwire.username', username);
	        window.localStorage.setItem('heartwire.password', password);
	
	        this.credentialsReady = true;
	        this.busy = true;
	        this._socket.init();
	    },
	
	    get _credentials() {
	        var username = window.localStorage.getItem('heartwire.username');
	        var password = window.localStorage.getItem('heartwire.password');
	
	        return [username, password];
	    }
	
	}, _EventTarget2.default).get();
	
	exports.default = Account;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/** @lends EventTarget# */
	var EventTarget = {
	
	    /** @type {Object} */
	    _listeners: null,
	
	    /**
	     * @constructs
	     *
	     * @return {void}
	     */
	    _make: function _make() {
	        this._listeners = {};
	    },
	
	    /**
	     * registers a new listener for the given event.
	     *
	     * @param {string} type the type of event
	     * @param {function} listener callback to execute when the event fires
	     *
	     * @return {void}
	     */
	    on: function on(type, listener) {
	        if (!this._listeners[type]) {
	            this._listeners[type] = [];
	        }
	
	        this._listeners[type].push(listener);
	    },
	
	    /**
	     * emmits a new event on this object
	     *
	     * @param {string} type the type of event
	     * @param {*} data data to send to the callbacks
	     *
	     * @return {void}
	     */
	    emit: function emit(type, data) {
	        var _this = this;
	
	        if (this._listeners[type]) {
	            setTimeout(function () {
	                return _this._listeners[type].forEach(function (listener) {
	                    return listener.apply(_this, [data]);
	                });
	            }, 0);
	        }
	    }
	};
	
	exports.default = EventTarget;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _make2 = __webpack_require__(2);
	
	var _Thread = __webpack_require__(6);
	
	var _Thread2 = _interopRequireDefault(_Thread);
	
	var _ApplicationInternal = __webpack_require__(8);
	
	var _ApplicationInternal2 = _interopRequireDefault(_ApplicationInternal);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Internal = new WeakMap();
	
	/** @lends Application.prototype */
	var Application = {
	
	    /**
	    * Name of this application so other components can identify the application.
	    *
	    * @type {string}
	    */
	    name: '',
	
	    /**
	    * Some components may need to know the version of this applicaion.
	    *
	    * @type {string}
	    */
	    version: '0.0.0',
	
	    /**
	    * @type {string}
	    */
	    author: '',
	
	    /**
	    * @constructs
	    *
	    * @return {void}
	    */
	    _make: function _make() {
	        Internal.set(this, (0, _make2.Make)(_ApplicationInternal2.default)());
	    },
	
	    /**
	    * Initializes this application, default interface for components and modules.
	    *
	    * @return {void}
	    */
	    init: function init() {
	        console.log('Initialzing Application "' + this.name + '"!');
	    },
	
	    /**
	    * Registers a new event listener for the given event type.
	    *
	    * @param {string} type the event type
	    * @param {function} listener the listener function
	    *
	    * @return {Application} this application
	    */
	    on: function on(type, listener) {
	        var scope = Internal.get(this);
	
	        if (!scope.listeners[type]) {
	            scope.listeners[type] = [];
	        }
	
	        scope.listeners[type].push(listener);
	
	        return this;
	    },
	
	    /**
	    * removes a previously attached listener function.
	    *
	    * @param  {string} type     the listener type
	    * @param  {Function} listener the listener function to remove
	    *
	    * @return {void}
	    */
	    removeListener: function removeListener(type, listener) {
	        var scope = Internal.get(this);
	
	        if (scope.listeners[type]) {
	            var index = scope.listeners[type].indexOf(listener);
	
	            scope.listeners[type].splice(index, 1);
	        }
	    },
	
	    /**
	    * Emmits a new event on this application.
	    *
	    * @param {string} type event type
	    * @param {Object} data event data
	    *
	    * @return {void}
	    */
	    emit: function emit(type, data) {
	        var scope = Internal.get(this);
	        var name = this.name ? this.name + ':%c ' : '%c%c';
	
	        if (scope.listeners[type]) {
	            console.log('%c' + name + type + ' event emitted', 'font-weight: 900; text-decoration: underline;', 'font-weight: initial; text-decoration: initial;');
	
	            setTimeout(function () {
	                return scope.listeners[type].forEach(function (f) {
	                    return f(data);
	                });
	            }, 0);
	        }
	    },
	
	    /**
	    * Creates a new thread for this applicaion.
	    *
	    * @param {function} f function to execute in a new thread
	    *
	    * @return {ApplicationScopeInterface} this applicaion scope
	    */
	    thread: function thread(f) {
	        var scope = Internal.get(this);
	
	        scope.workers.push((0, _make2.Make)(_Thread2.default)(f));
	
	        return this;
	    },
	
	    /**
	    * This function will try to terminate the application by emitting the termination event.
	    *
	    * @param {string} reason - the reason for the termination.
	    *
	    * @return {void}
	    */
	    terminate: function terminate(reason) {
	        this.emit('terminate', reason);
	    }
	
	};
	
	exports.default = Application;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Shared = __webpack_require__(7);
	
	var _Shared2 = _interopRequireDefault(_Shared);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * this prototype defines a new scope worker
	 */
	var Thread = {
	
	    /**
	     * The parent application of this thread.
	     *
	     * @type {Application}
	     */
	    parent: null,
	
	    /**
	     * The Worker Object for this thread.
	     *
	     * @type {Worker}
	     * @private
	     */
	    _thread: null,
	
	    _promise: null,
	
	    then: null,
	
	    catch: null,
	
	    /**
	     * @constructs
	     * @param {function} f
	     * @param {Application} parent
	     */
	    _make: function _make(f, parent) {
	        var _this = this;
	
	        this.parent = parent;
	        this.thread = new Worker(_Shared2.default.threadLoader);
	        this.thread.postMessage({ name: 'init', func: f });
	        this.progressListeners = [];
	
	        this._promise = new Promise(function (done) {
	            _this._thread.addEventListener('message', function (e) {
	                if (e.data.name == 'af-worker-done') done(e.data.data);
	            }, false);
	        });
	
	        this._thread.addEventListener('message', function (e) {
	            if (e.data.name == 'af-worker-progress') {
	                _this.emit('progress', e.data.data);
	            }
	        }, false);
	
	        this.then = this._promise.then.bind(this._promise);
	        this.catch = this._promise.catch.bind(this._promise);
	    }
	}; /**
	    * @file Thread
	    * @deprecated Don't use this anymore. It will be removed soon.
	    */
	
	exports.default = Thread;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * @file Shared
	 * @deprecated Don't use this anymore. It will be removed soon.
	 */
	
	exports.default = {};

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	/** @lends ApplicationInternal# */
	var ApplicationInternal = {
	  /**
	   * @type {Thread}
	   */
	  thread: null,
	
	  /**
	   * @type {Worker[]}
	   */
	  workers: null,
	
	  /**
	   * @type {Function[]}
	   */
	  listeners: null,
	
	  /**
	   * @type {Catalog}
	   */
	  modules: null,
	
	  /**
	   * this prototype defines a new application scope
	   *
	   * @constructs
	   *
	   * @return {void}
	   */
	  _make: function _make() {
	    this.workers = [];
	    this.listeners = [];
	
	    this._make = null;
	  }
	};
	
	exports.default = ApplicationInternal;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _DataBinding = __webpack_require__(10);
	
	var _DataBinding2 = _interopRequireDefault(_DataBinding);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var BottomInput = {
	    currentDraft: '',
	
	    get inputValue() {
	        return this.inputFocused || this.currentDraft.length > 0 ? this.currentDraft : this.inputElement && this.inputElement.getAttribute('placeholder');
	    },
	
	    set inputValue(value) {
	        this.currentDraft = value;
	    },
	
	    inputFocused: false,
	
	    get usePlaceholderClass() {
	        return !this.inputFocused && this.currentDraft.length === 0 ? 'placeholder' : '';
	    },
	
	    /** @type HTMLDivElement */
	    inputElement: null,
	
	    inputFocusChange: function inputFocusChange(event) {
	        event.cancleRecycle();
	        this.view.inputFocused = event.type === 'focus';
	        this.__apply__(null, true);
	    },
	
	    scope: null,
	
	    _make: function _make() {
	        this.scope = _DataBinding2.default.makeTemplate('#bottom-input', { view: this });
	    }
	};
	
	exports.default = BottomInput;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DataBinding = undefined;
	
	var _Template = __webpack_require__(11);
	
	var _Util = __webpack_require__(15);
	
	var _Bind = __webpack_require__(12);
	
	var _ViewPort = __webpack_require__(29);
	
	var _ViewPort2 = _interopRequireDefault(_ViewPort);
	
	__webpack_require__(30);
	
	__webpack_require__(31);
	
	__webpack_require__(32);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	NodeList.prototype.forEach = NamedNodeMap.prototype.forEach = Array.prototype.forEach; /**
	                                                                                        * DataBinding Module
	                                                                                        *
	                                                                                        * @module DataBinding
	                                                                                        * @default module:DataBinding.DataBinding
	                                                                                        */
	
	var style = document.createElement('style');
	
	style.innerHTML = '\n    [bind-display="false"] {\n        display: none !important;\n    }\n\n    [bind-visible="false"] {\n        visibility: hidden;\n    }\n';
	
	(0, _Util.polyInvoke)(document.head).appendChild(style);
	
	/**
	 * [DataBinding description]
	 *
	 * @type {module:DataBinding.ModuleInterface}
	 */
	var DataBinding = exports.DataBinding = {
	    makeTemplate: _Template.makeTemplate,
	    bindNode: _Bind.bindNode,
	    ViewPort: _ViewPort2.default
	};
	
	exports.default = DataBinding;
	
	/**
	 * @interface ModuleInterface
	 * @borrows module:DataBinding/Bind.bindNode as bindNode
	 * @borrows module:DataBinding/Template.makeTemplate as makeTemplate
	 * @borrows module:DataBinding/ViewPort.ViewPort
	 * @static
	 *
	 */

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.makeTemplate = undefined;
	
	var _make = __webpack_require__(2);
	
	var _Bind = __webpack_require__(12);
	
	var _Util = __webpack_require__(15);
	
	var _TemplateLoader = __webpack_require__(27);
	
	var _Parser = __webpack_require__(13);
	
	var _RenderEngine = __webpack_require__(20);
	
	var _RenderEngine2 = _interopRequireDefault(_RenderEngine);
	
	var _ScopePrototype = __webpack_require__(23);
	
	var _ScopePrototype2 = _interopRequireDefault(_ScopePrototype);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Instanciates a template based on a specified element.
	 *
	 * @param  {HTMLTemplateElement}               template    the template to instanciate
	 * @param  {module:DataBinding.ScopePrototype} scope       the scope to operate on
	 * @param  {Application}                       application the application this binding belongs to
	 * @param  {Node}                              item        the original node
	 *
	 * @return {void}
	 */
	var makeElementFromTemplate = function makeElementFromTemplate(template, scope, application, item) {
	    _RenderEngine2.default.schedulePostRenderTask(function () {
	        var node = document.importNode(template.content, true);
	        var placeholder = node.querySelector('bind-placeholder');
	
	        item.attributes.forEach(function (attr) {
	            (0, _Util.polyInvoke)(node.firstElementChild).setAttribute(attr.name, attr.value);
	        });
	
	        if (placeholder) {
	            (function () {
	                var node = item.firstElementChild;
	                (0, _Util.polyInvoke)(placeholder.parentNode).replaceChild(item.firstElementChild, placeholder);
	
	                [].forEach.apply(item.children, [function (item) {
	                    (0, _Util.polyInvoke)(node.parentNode).appendChild(item);
	                }]);
	            })();
	        }
	
	        node.firstElementChild.className = template.id + ' ' + node.firstElementChild.className;
	
	        scope = scope();
	
	        [].map.apply(node.firstElementChild.attributes, [function (item) {
	            if (item.name.search(/^scope\-/) > -1) {
	                scope[item.name.replace(/^scope\-/, '')] = item.value;
	            }
	        }]);
	
	        if (template.hasAttribute('component')) {
	            scope.element = node.firstElementChild;
	        }
	
	        scope = (0, _Bind.bindNode)(node, scope);
	
	        (0, _Util.polyInvoke)(item.parentNode).replaceChild(node, item);
	
	        if (application) {
	            application.emit('newElement:' + template.id, scope);
	        }
	    });
	};
	
	/**
	 * creates a new instance of an HTML template and applies the binding with
	 * the given scope.
	 *
	 * @function
	 *
	 * @param {Node|string} template - the template to render
	 * @param {ScopePrototype} scope - the scope for this template to bind to
	 * @param {Application} [application] - the application this template belongs to
	 * @param {ScopePrototype} [parentScope] - the surounding scope of this template node
	 *
	 * @return {Object} - collection of scope and rendered element
	 */
	/**
	 * @module DataBinding/Template
	 */
	
	var makeTemplate = exports.makeTemplate = function makeTemplate(template, scope, application, parentScope) {
	    var _this = this;
	
	    template = typeof template === 'string' ? document.querySelector(template) : template;
	
	    if (template.hasAttribute('src') && !template.processed) {
	        var source = template.getAttribute('src');
	
	        if (parentScope) {
	            var value = (0, _Parser.parseExpression)(source, parentScope);
	
	            source = value && value != '' ? value : source;
	        }
	
	        scope = (0, _make.Make)(scope, _ScopePrototype2.default)();
	
	        (0, _TemplateLoader.importTemplate)(source, template).then(function (template) {
	            template.processed = true;
	            makeTemplate(template, scope, application, parentScope);
	        });
	
	        return scope;
	    } else if (template.hasAttribute('bind-element')) {
	        (function () {
	            var makeElement = makeElementFromTemplate.bind(_this, template, scope, application);
	            var list = document.querySelectorAll(template.id);
	
	            [].forEach.apply(list, [makeElement]);
	
	            new MutationObserver(function (mutations) {
	                mutations.forEach(function (item) {
	                    if (item.addedNodes.length > 0) {
	                        var _list = [].map.apply(item.addedNodes, [function (node) {
	                            return node.querySelectorAll ? [].slice.apply(node.querySelectorAll(template.id)) : [];
	                        }]).reduce(function (prev, next) {
	                            return prev.concat(next);
	                        }, []);
	
	                        _list = _list.concat([].filter.apply(item.addedNodes, [function (node) {
	                            return node.localName === template.id;
	                        }]));
	
	                        [].forEach.apply(_list, [makeElement]);
	                    }
	                });
	            }).observe(document.body, {
	                childList: true,
	                subtree: true
	            });
	        })();
	    } else {
	        var node = document.importNode(template.content, true);
	        var isReplace = template.hasAttribute('replace');
	        var isInsert = template.hasAttribute('insert');
	
	        scope = (0, _Bind.bindNode)(node, scope);
	
	        if (isReplace || isInsert) {
	            (function () {
	                var elementList = [].slice.apply(node.childNodes);
	
	                scope.__cleanElements__ = function () {
	                    elementList.forEach(function (node) {
	                        node.parentNode && node.parentNode.removeChild(node);
	                    });
	                };
	            })();
	        }
	
	        var parentNode = template.parentNode;
	
	        if (template.getAttribute('poly-parent')) {
	            var parentName = template.getAttribute('poly-parent');
	
	            parentNode = (0, _Util.getPolyParent)(template, parentName);
	        }
	
	        if (isReplace) {
	            console.log('replace template');
	
	            (0, _Util.polyInvoke)(parentNode).replaceChild(node, template);
	        } else if (isInsert) {
	            (0, _Util.polyInvoke)(parentNode).insertBefore(node, template);
	        }
	
	        return { node: node, scope: scope };
	    }
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.destoryScope = exports.recycle = exports.bindNode = exports.watcherList = undefined;
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @module DataBinding/Bind
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */
	
	var _make = __webpack_require__(2);
	
	var _Parser = __webpack_require__(13);
	
	var _Mapping = __webpack_require__(14);
	
	var _Util = __webpack_require__(15);
	
	var _AutoBinding = __webpack_require__(16);
	
	var _AutoBinding2 = _interopRequireDefault(_AutoBinding);
	
	var _Binding = __webpack_require__(17);
	
	var _Binding2 = _interopRequireDefault(_Binding);
	
	var _BindingRegistry = __webpack_require__(18);
	
	var _BindingRegistry2 = _interopRequireDefault(_BindingRegistry);
	
	var _ClassBinding = __webpack_require__(19);
	
	var _ClassBinding2 = _interopRequireDefault(_ClassBinding);
	
	var _EnabledBinding = __webpack_require__(22);
	
	var _EnabledBinding2 = _interopRequireDefault(_EnabledBinding);
	
	var _RenderEngine = __webpack_require__(20);
	
	var _RenderEngine2 = _interopRequireDefault(_RenderEngine);
	
	var _ScopePrototype = __webpack_require__(23);
	
	var _ScopePrototype2 = _interopRequireDefault(_ScopePrototype);
	
	var _StyleBinding = __webpack_require__(24);
	
	var _StyleBinding2 = _interopRequireDefault(_StyleBinding);
	
	var _TemplateRepeatBinding = __webpack_require__(25);
	
	var _TemplateRepeatBinding2 = _interopRequireDefault(_TemplateRepeatBinding);
	
	var _TwoWayBinding = __webpack_require__(26);
	
	var _TwoWayBinding2 = _interopRequireDefault(_TwoWayBinding);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Contains all scope, scopeInfo pairs.
	 *
	 * @type {WeakMap}
	 */
	var scopeList = new Map();
	
	/**
	 * @type {ScopePrototype[]}
	 */
	var scopeIndex = [];
	
	/**
	 * @type {Array[]}
	 */
	var watcherList = exports.watcherList = new Map();
	
	/**
	 * @type {Object}
	 */
	var expressionTracking = {};
	
	/**
	 * applies the binding to the node for the given scope.
	 *
	 * @function
	 * @param {Node|string} node - the node which should be bound
	 * @param {Object} scope - the scope which should be bound to
	 * @param {boolean} isolated - indicates if this scope should be recycled isolated
	 * @return {module:DataBinding~ScopePrototype} the scope this node is bound to
	 */
	var bindNode = exports.bindNode = function bindNode(node, scope, isolated) {
	    scope = (0, _make.hasPrototype)(scope, _ScopePrototype2.default) ? scope : (0, _make.Make)(scope, _ScopePrototype2.default)();
	    node = (0, _make.hasPrototype)(node, Node) ? node : document.querySelector(node);
	
	    scopeList.set(scope, {
	        node: node,
	        bindings: []
	    });
	
	    scopeIndex.push(scope);
	
	    checkNode(node, scope);
	    recycle(isolated ? scope : false);
	
	    return scope;
	};
	
	/**
	 * Travels through a node and it's children searching for binding expressions
	 *
	 * @param {Node} node - the node to check
	 * @param {module:DataBinding.ScopePrototype} scope - the scope this node should be bound to
	 * @param {Node} parentNode - the parent of the provided node
	 * @return {void}
	 */
	var checkNode = function checkNode(node, scope, parentNode) {
	    var dataRegex = /{{[^{}]*}}/g;
	    var scopeInfo = scopeList.get(scope);
	
	    if (node.nodeName == '#text' || node.nodeType === 2) {
	        var text = node.value || (0, _Util.polyInvoke)(node).textContent,
	            variables = text.match(dataRegex),
	            visibilityBinding = node.name === _Mapping.attributeNames.get('visible'),
	            transparencyBinding = node.name === _Mapping.attributeNames.get('transparent'),
	            enabledAttribute = node.name === _Mapping.attributeNames.get('enabled'),
	            classes = node.name === _Mapping.attributeNames.get('classes'),
	            modelBinding = node.name === _Mapping.attributeNames.get('model'),
	            autoBinding = node.name === 'bind',
	            twoWay = node.name === _Mapping.attributeNames.get('value') || modelBinding,
	            styleBinding = node.name === 'bind-style';
	
	        var singleBinding = visibilityBinding || transparencyBinding;
	
	        if (twoWay) {
	            bindTwoWay(text, scope, scopeInfo, node, parentNode, modelBinding);
	        } else if (classes) {
	            bindClasses(text, node, scopeInfo, parentNode);
	        } else if (enabledAttribute) {
	            bindEnabled(text, scopeInfo, parentNode);
	        } else if (autoBinding) {
	            bindAuto(text, scopeInfo, parentNode);
	        } else if (styleBinding) {
	            bindStyle(text, scopeInfo, scope, parentNode);
	        } else if (_BindingRegistry2.default.get(node.name) && _BindingRegistry2.default.get(node.name).test()) {
	            (0, _make.Make)(_BindingRegistry2.default.get(node.name))({
	                text: text,
	                variables: variables,
	                scope: scope,
	                scopeInfo: scopeInfo,
	                node: node,
	                parentNode: parentNode
	            });
	        } else if (variables || singleBinding) {
	            bindSimple(text, node, variables, scopeInfo, singleBinding, parentNode);
	        }
	    } else if (node.localName === 'template') {
	        var repeatedTemplate = node.hasAttribute('replace') && node.hasAttribute('repeat') || node.hasAttribute('bind-repeat');
	
	        node.attributes.forEach(function (child) {
	            return checkNode(child, scope, node);
	        });
	
	        if (repeatedTemplate) {
	            bindTemplateRepeat(node, scopeInfo);
	        }
	    } else {
	        if (node.attributes) {
	            node.attributes.forEach(function (child) {
	                return checkNode(child, scope, node);
	            });
	
	            var events = node.getAttribute(_Mapping.attributeNames.get('events'));
	
	            if (events !== null) {
	                bindEvents(events, node, scope);
	
	                (0, _Util.polyInvoke)(node).removeAttribute(_Mapping.attributeNames.get('events'));
	            }
	        }
	
	        node.childNodes.forEach(function (node) {
	            return checkNode(node, scope);
	        });
	    }
	};
	
	/**
	 * creates a two way binding
	 *
	 * @param {string} text - the attribute text
	 * @param {module:DataBinding.ScopePrototype} scope - the scope for this binding
	 * @param {Object} scopeInfo - the scopeInfo for this binding
	 * @param {Node} node - the attribute node
	 * @param {Node} parentNode - the actual node
	 * @param {boolean} indirect - indicates if this binding is indirect
	 * @return {void}
	 */
	var bindTwoWay = function bindTwoWay(text, scope, scopeInfo, node, parentNode, indirect) {
	    var property = text.replace(/[{}]/g, '');
	    var value = (0, _Parser.parseExpression)(property, scope);
	
	    var _split = (parentNode.getAttribute(_Mapping.attributeNames.get('modelEvent')) || '').split(':');
	
	    var _split2 = _slicedToArray(_split, 4);
	
	    var event = _split2[0];
	    var viewBinding = _split2[1];
	    var eventBinding = _split2[2];
	    var preventDefault = _split2[3];
	
	    /** @type {TwoWayBinding} */
	
	    var binding = (0, _make.Make)({
	        properties: [property],
	        originalNodeValue: text,
	        currentValue: value,
	        node: node,
	        parentNode: parentNode,
	        indirect: indirect,
	        viewBinding: viewBinding
	    }, _TwoWayBinding2.default).get();
	
	    scopeInfo.bindings.push(binding);
	
	    if (node.name === _Mapping.attributeNames.get('model')) {
	        parentNode.addEventListener(event, function (e) {
	            if (preventDefault === 'true') {
	                e.preventDefault();
	            }
	
	            console.log(e);
	            var value = (0, _Parser.parseExpression)(eventBinding, e);
	            compareTwoWay(value, scope, binding);
	        });
	    } else if (node.name === _Mapping.attributeNames.get('value')) {
	        parentNode.addEventListener('keyup', function (e) {
	            e.preventDefault();
	            compareTwoWay(getElementValue(e.target), scope, binding);
	        });
	    }
	};
	
	/**
	 * Compares for changes in the UI in a two way binding
	 *
	 * @param {string} newValue - the new value to compare
	 * @param {module:DataBinding.ScopePrototype} scope - the scope of the comparison
	 * @param {TwoWayBinding} binding - the binding to compare
	 * @return {void}
	 */
	var compareTwoWay = function compareTwoWay(newValue, scope, binding) {
	    if (binding.currentValue !== newValue) {
	        (0, _Parser.assignExpression)(binding.properties[0], scope, newValue);
	        binding.currentValue = newValue;
	
	        console.log('update from view:', scope);
	
	        recycle();
	    }
	};
	
	/**
	 * creates a simple binding
	 *
	 * @param {string} text the initial text of the node
	 * @param {Node} node the text or attribute node of the binding
	 * @param {string[]} variables list of expressions
	 * @param {Object} scopeInfo meta data of the current scope
	 * @param {boolean} singleExpression - indicates if text contains only one expression
	 * @param {Node} parentNode the element that contains the text node or attribute
	 *
	 * @return {void}
	 */
	var bindSimple = function bindSimple(text, node, variables, scopeInfo, singleExpression, parentNode) {
	    /** @type {Binding} */
	    var binding = (0, _make.Make)({
	        originalNodeValue: text,
	        node: node,
	        parentNode: parentNode,
	        singleExpression: singleExpression,
	        properties: variables ? variables.map(function (item) {
	            return item.replace(/[{}]/g, '');
	        }) : []
	    }, _Binding2.default).get();
	
	    scopeInfo.bindings.push(binding);
	};
	
	/**
	 * binds an object expression to node.className.
	 *
	 * @param  {string} text      the initial text value of the binding node
	 * @param  {Node}   node        the binding node
	 * @param  {Object} scopeInfo the meta data of the current scope
	 * @param  {Node}   parentNode  the parent of the binding node
	 *
	 * @return {void}
	 */
	var bindClasses = function bindClasses(text, node, scopeInfo, parentNode) {
	    var binding = (0, _make.Make)({
	        originalNodeValue: text,
	        node: node,
	        classes: (0, _Parser.ObjectParser)(text),
	        parentNode: parentNode
	    }, _ClassBinding2.default).get();
	
	    scopeInfo.bindings.push(binding);
	};
	
	/**
	 * binds an expression to the disabled attribute.
	 *
	 * @param  {string} text       the initial value of the binding node
	 * @param  {Object} scopeInfo  the meta data of the current scope
	 * @param  {Node}   parentNode the parent of the binding node
	 *
	 * @return {void}
	 */
	var bindEnabled = function bindEnabled(text, scopeInfo, parentNode) {
	    var binding = (0, _make.Make)({
	        originalNodeValue: text,
	        parentNode: parentNode
	    }, _EnabledBinding2.default)();
	
	    scopeInfo.bindings.push(binding);
	};
	
	/**
	 * binds a template to an array or list. The template is repeated for each list item.
	 *
	 * @param  {Node}   template  the template node
	 * @param  {Object} scopeInfo the meta data of the current scope
	 *
	 * @return {void}
	 */
	var bindTemplateRepeat = function bindTemplateRepeat(template, scopeInfo) {
	    var text = template.hasAttribute('bind-repeat') ? template.getAttribute('bind-repeat') : template.getAttribute('repeat');
	
	    var marker = document.createComment('repeat ' + template.id + ' with ' + text);
	    var binding = (0, _make.Make)({
	        originalNodeValue: text,
	        template: template,
	        marker: marker
	    }, _TemplateRepeatBinding2.default)();
	
	    console.log('replace template with marker');
	    (0, _Util.polyInvoke)(template.parentNode).replaceChild(marker, template);
	    scopeInfo.bindings.push(binding);
	};
	
	/**
	 * Binds the events specified for a Node
	 *
	 * @param {string[]}                          events a string representation of the object with all the event / expression pairs.
	 * @param {Node}                              node   the node on which the event listeners should be registered.
	 * @param {module:DataBinding~ScopePrototype} scope  the data scope on which the binding happens.
	 * @return {void}
	 */
	var bindEvents = function bindEvents(events, node, scope) {
	    events = (0, _Parser.ObjectParser)(events);
	
	    Object.keys(events).forEach(function (name) {
	        var _events$name$split = events[name].split('|');
	
	        var _events$name$split2 = _slicedToArray(_events$name$split, 2);
	
	        var method = _events$name$split2[0];
	        var modifier = _events$name$split2[1];
	
	
	        if (scope.$methods && scope.$methods[method.trim()]) {
	            node.addEventListener(name.trim(), function (e) {
	                scope.$methods[method.trim()].apply(scope, [e]);
	
	                scope.__apply__();
	            });
	        } else {
	            method = (0, _Parser.parseExpression)(method.trim(), scope);
	
	            node.addEventListener(name.trim(), function (e) {
	                var canceled = false;
	
	                e.cancleRecycle = function () {
	                    canceled = true;
	                };
	
	                method.apply(scope, [e]);
	
	                if (!canceled) scope.__apply__();
	            }, modifier === 'capture');
	        }
	    });
	};
	
	/**
	 * automatically binds a template to a property of the current scope
	 *
	 * @param  {string} text      the binding text
	 * @param  {Object} scopeInfo the meta data of the current scope
	 * @param  {Node}   template  the template node
	 *
	 * @return {void}
	 */
	var bindAuto = function bindAuto(text, scopeInfo, template) {
	    var binding = (0, _make.Make)({
	        scopeName: text,
	        template: template
	    }, _AutoBinding2.default)();
	
	    scopeInfo.bindings.push(binding);
	};
	
	/**
	 * binds visual properties to the scope
	 *
	 * @param  {string}                            text       the binding text
	 * @param  {Object}                            scopeInfo  the meta data of the scope
	 * @param  {module:DataBinding~ScopePrototype} scope      the current scope
	 * @param  {Node}                              parentNode the parent of the binding node
	 *
	 * @return {void}
	 */
	var bindStyle = function bindStyle(text, scopeInfo, scope, parentNode) {
	    var binding = (0, _make.Make)({
	        bindings: text,
	        parentNode: parentNode
	    }, _StyleBinding2.default)(scope);
	
	    scopeInfo.bindings.push(binding);
	};
	
	/**
	 * executes every watcher for the given scope.
	 *
	 * @param  {module:DataBinding~ScopePrototype} scope the current scope
	 *
	 * @return {void}
	 */
	var executeWatchers = function executeWatchers(scope) {
	    watcherList.get(scope) && watcherList.get(scope).forEach(function (watcher) {
	        var value = (0, _Parser.parseExpression)(watcher.expression, scope);
	
	        expressionTracking[watcher.expression] = expressionTracking[watcher.expression] || { value: '', newValue: '' };
	
	        if (expressionTracking[watcher.expression].value !== value) {
	            watcher.cb.apply(scope, [value]);
	
	            expressionTracking[watcher.expression].newValue = value;
	        }
	    });
	};
	
	/**
	 * Checks every binding for the given scope and updates every value.
	 *
	 * @function
	 * @param {module:DataBinding~ScopePrototype} [scope] the scope to recycle
	 *
	 * @return {void}
	 */
	var recycle = exports.recycle = function recycle(scope) {
	    _RenderEngine2.default.scheduleRenderTask(function () {
	        var t0 = window.performance.now();
	
	        if (scope) {
	            executeWatchers(scope);
	            scopeList.get(scope).bindings.forEach(function (binding) {
	                return binding.update(scope);
	            });
	        } else {
	            scopeIndex.forEach(function (scope) {
	                executeWatchers(scope);
	                scopeList.get(scope).bindings.forEach(function (binding) {
	                    return binding.update(scope);
	                });
	            });
	        }
	
	        Object.keys(expressionTracking).forEach(function (expr) {
	            expr = expressionTracking[expr];
	
	            expr.value = expr.newValue;
	        });
	
	        var t1 = window.performance.now();
	        var duration = (t1 - t0) / 1000;
	        var color = null;
	
	        if (duration >= 0.033) {
	            color = 'red';
	        } else if (duration >= 0.016) {
	            color = 'yellow';
	        } else {
	            color = 'green';
	        }
	
	        color = 'color: ' + color + ';';
	        duration = duration.toFixed(2);
	
	        if (scope) {
	            console.log('scope recycled in %c' + duration + 's', color);
	        } else {
	            console.log('full recycle in %c' + duration + 's', color);
	        }
	    }, scope || 'DataBindingRecycle');
	};
	
	/**
	 * destories a scope.
	 *
	 * @function
	 * @param {module:DataBinding~ScopePrototype} scope the scope to destory
	 * @param {boolean} inProgress                indicates if this is an initial call or not.
	 *
	 * @return {void}
	 */
	var destoryScope = exports.destoryScope = function destoryScope(scope, inProgress) {
	    console.log(scopeList);
	    var scopeInfo = scopeList.get(scope);
	
	    var _scopeInfo$bindings$r = scopeInfo.bindings.reduce(function (prev, binding) {
	        var _prev = _slicedToArray(prev, 2);
	
	        var scopes = _prev[0];
	        var bindings = _prev[1];
	
	
	        if (binding.destory) {
	            var _binding$destory = binding.destory();
	
	            var _binding$destory2 = _slicedToArray(_binding$destory, 2);
	
	            var scopes_add = _binding$destory2[0];
	            var bindings_add = _binding$destory2[1];
	
	
	            scopes += scopes_add;
	            bindings += bindings_add;
	        }
	
	        return [scopes, bindings];
	    }, [0, 0]);
	
	    var _scopeInfo$bindings$r2 = _slicedToArray(_scopeInfo$bindings$r, 2);
	
	    var scopes = _scopeInfo$bindings$r2[0];
	    var bindings = _scopeInfo$bindings$r2[1];
	
	
	    bindings += scopeInfo.bindings.length;
	    scopes += 1;
	
	    scopeList.delete(scope);
	    scopeIndex.splice(scopeIndex.indexOf(scope), 1);
	    watcherList.delete(scope);
	
	    if (inProgress) {
	        return [scopes, bindings];
	    } else {
	        console.log(scopes + ' scopes and ' + bindings + ' bindings cleaned!');
	    }
	};
	
	/**
	 * Returns the value of an DOM Node
	 *
	 * @param {Node} node the node to fetch the value from
	 *
	 * @return {string} value of this node
	 */
	var getElementValue = function getElementValue(node) {
	    if (node.localName === 'input') {
	        return node.value;
	    } else {
	        return 'UNKNOWN NODE!';
	    }
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * @module DataBinding/Parser
	 */
	
	/**
	 * Parses an object expression
	 *
	 * @param {string} source - the string to parse.
	 * @return {Object} the parsed result.
	 */
	var ObjectParser = exports.ObjectParser = function ObjectParser(source) {
	    var target = null;
	    var key = false;
	    var keyBuffer = '';
	    var valueBuffer = '';
	    var run = true;
	
	    source.split('').forEach(function (char) {
	        if (run) {
	            if (char === '{') {
	                target = {};
	                key = true;
	            } else if (char === ':') {
	                key = false;
	            } else if (char === ',') {
	                target[keyBuffer.trim()] = valueBuffer.trim();
	                keyBuffer = valueBuffer = '';
	                key = true;
	            } else if (char === '}') {
	                target[keyBuffer.trim()] = valueBuffer.trim();
	                run = false;
	            } else if (key) {
	                keyBuffer += char;
	            } else if (!key) {
	                valueBuffer += char;
	            }
	        }
	    });
	
	    return target;
	};
	
	/**
	 * Parses a given expression in the context of the given scope.
	 *
	 * @param {string} expression - the expression to parse.
	 * @param {ScopePrototype} scope - the scope on which the expression should be parsed.
	 * @return {*} the result value.
	 */
	var parseExpression = exports.parseExpression = function parseExpression(expression) {
	    for (var _len = arguments.length, contexts = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        contexts[_key - 1] = arguments[_key];
	    }
	
	    var chain = expression.split('.');
	    var scope = null;
	    var functionTest = /\(((([\w\.]+)(, |,|))+)\)/;
	
	    for (var i = 0; i < contexts.length; i++) {
	        scope = contexts[i];
	
	        chain.forEach(function (item) {
	            var pos = item.search(functionTest);
	
	            if (scope) {
	                if (pos > 0) {
	                    var args = item.match(functionTest)[1].split(',').map(function (item) {
	                        return item.trim();
	                    });
	                    var scopeChild = scope[item.substring(0, pos)];
	
	                    if (scopeChild) {
	                        args = args.map(function (arg) {
	                            return parseExpression.apply(undefined, [arg].concat(contexts));
	                        });
	                        scope = scopeChild.apply(scope, args);
	                    } else {
	                        return null;
	                    }
	                } else {
	                    scope = scope[item];
	                }
	            }
	        });
	
	        if (scope !== null && scope !== undefined) {
	            break;
	        }
	    }
	
	    return scope !== null && typeof scope !== "undefined" ? scope : '';
	};
	
	/**
	 * Assings an value to an expression in an given scope
	 *
	 * @param {string} expression the expression on whith the value should be assigned
	 * @param {ScopePrototype} scope the scope to operate on
	 * @param {string} value the value to assign
	 *
	 * @return {void}
	 */
	var assignExpression = exports.assignExpression = function assignExpression(expression, scope, value) {
	    var chain = expression.split('.');
	
	    chain.forEach(function (property, index) {
	        if (chain.length - 1 !== index) {
	            scope = scope[property];
	        } else {
	            scope[property] = value;
	        }
	    });
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * @module DataBinding/Mapping
	 */
	
	/**
	 * Contains all the attribute names
	 *
	 * @namespace
	 */
	var attributeNames = exports.attributeNames = {
	  events: 'events',
	  visible: 'display',
	  transparent: 'visible',
	  classes: 'class',
	  value: 'value',
	  prefix: 'bind',
	  enabled: 'enabled',
	  model: 'model',
	  modelEvent: 'model-event',
	
	  /**
	   * returns the value for a key
	   *
	   * @param  {string} key the key to lookup
	   *
	   * @return {string}     the coresponding value
	   */
	  get: function get(key) {
	    return this.prefix + '-' + this[key];
	  },
	
	  /**
	   * cuts off the prefix of the name
	   *
	   * @param  {string} name initial value
	   *
	   * @return {string}      the clean value
	   */
	  rename: function rename(name) {
	    return name.replace(this.prefix + '-', '');
	  }
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getPolyParent = exports.polyInvoke = exports.polyMask = exports.unwrapPolymerNode = exports.selectAllElements = exports.selectElement = undefined;
	
	var _make = __webpack_require__(2);
	
	/**
	 * selects a dom node by the given query.
	 *
	 * @function
	 * @deprecated don't use this anymore, polyMask is deprecated.
	 *
	 * @param {string} query the query selector to search for on the DOM
	 * @param {Node} [context] the node to start the searching on
	 *
	 * @return {Node} the first node that matches the selector
	 */
	var selectElement = exports.selectElement = function selectElement(query, context) {
	    var node = null;
	
	    if (context) {
	        node = context.querySelector(query);
	    } else {
	        node = document.querySelector(query);
	    }
	
	    node = polyMask(node);
	
	    return node;
	};
	
	/**
	 * @function
	 * @deprecated don't use anymore. Use {@link document.querySelectorAll}
	 *
	 * @param {string} query the query to look for
	 * @param {Node} context the node to start the searching on
	 *
	 * @return {NodeList} the node list with all matching nodes
	 */
	var selectAllElements = exports.selectAllElements = function selectAllElements(query, context) {
	    var nodeList = null;
	
	    if (context) {
	        nodeList = context.querySelectorAll(query);
	    } else {
	        nodeList = document.querySelectorAll(query);
	    }
	
	    if (window.Polymer) {
	        nodeList = [].map.apply(nodeList, [polyMask]);
	    }
	
	    return nodeList;
	};
	
	/**
	 * attempts to extract the original node from an polymer node
	 *
	 * @function
	 * @deprecated there is no need to use this function anymore
	 *
	 * @param {Node} node the node to unwrap
	 *
	 * @return {Node} a mixin exposing the original node
	 */
	var unwrapPolymerNode = exports.unwrapPolymerNode = function unwrapPolymerNode(node) {
	    if (!(0, _make.hasPrototype)(node, Node)) {
	        return (0, _make.Mixin)(node, node.node);
	    }
	
	    return node;
	};
	
	/**
	 * creates a mixin of the node and a wrapped version from Polymer
	 *
	 * @function
	 * @deprecated this method shouldn't be used anymore. Use polyInvoke
	 *
	 * @param {Node} node the dom node to mask
	 *
	 * @return {Node} returns the masked node
	 */
	var polyMask = exports.polyMask = function polyMask(node) {
	    var polyNode = {};
	
	    var additions = {
	        get bare() {
	            return node;
	        }
	    };
	
	    if (window.Polymer) {
	        polyNode = window.Polymer.dom(node);
	    }
	
	    return (0, _make.Mixin)(polyNode, node, additions);
	};
	
	/**
	 * Tries to call Polymers dom() function if available, to keep them in the loop.
	 *
	 * @param {Node} node the node we want to take care of.
	 * @return {Node} the dom node, maybe wrapped.
	 */
	var polyInvoke = exports.polyInvoke = function polyInvoke(node) {
	
	    if (window.Polymer) {
	        node = window.Polymer.dom(node);
	    }
	
	    return node;
	};
	
	/**
	 * attempts to find a parent node with a particular node name
	 *
	 * @function
	 *
	 * @param {Node} node the base node
	 * @param {string} parentName the node name to search for
	 *
	 * @return {Node} the node we where searching for 
	 */
	var getPolyParent = exports.getPolyParent = function getPolyParent(node, parentName) {
	    while (node && node.localName !== parentName) {
	        node = node.parentNode;
	    }
	
	    return node;
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _make2 = __webpack_require__(2);
	
	var _Binding = __webpack_require__(17);
	
	var _Binding2 = _interopRequireDefault(_Binding);
	
	var _Parser = __webpack_require__(13);
	
	var _Template = __webpack_require__(11);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var AutoBinding = (0, _make2.Make)( /** @lends module:DataBinding.AutoBinding.prototype*/{
	
	    scopeName: '',
	
	    /** @type {HTMLTemplateNode} */
	    template: null,
	
	    /** @type {boolean} */
	    _isBound: false,
	
	    /**
	     * An auto binding instanciates a template and binds it
	     * to a property of the current scope.
	     *
	     * @constructs
	     * @extends module:DataBinding.Binding
	     * @return {void}
	     */
	    _make: function _make() {},
	
	    /** @type module:DataBinding.ScopePrototype */
	    _scope: null,
	
	    update: function update(scope) {
	        var _this = this;
	
	        if (!this._isBound) {
	            (function () {
	                var subScope = (0, _Parser.parseExpression)(_this.scopeName, scope);
	
	                setTimeout(function () {
	                    var scopeHolder = null;
	                    var scopeObjName = null;
	
	                    if (_this.scopeName.lastIndexOf('.') > 0) {
	                        scopeHolder = _this.scopeName.split('.');
	                        scopeObjName = scopeHolder.pop();
	                        scopeHolder = (0, _Parser.parseExpression)(scopeHolder.join('.'), scope);
	
	                        scopeHolder[scopeObjName] = (0, _Template.makeTemplate)(_this.template, subScope, true);
	
	                        _this._scope = scopeHolder[scopeObjName];
	                    } else {
	                        _this._scope = (0, _Template.makeTemplate)(_this.template, subScope, true);
	                    }
	                }, 0);
	
	                _this._isBound = true;
	            })();
	        }
	    },
	
	    /**
	     * destroys this binding. This binding needs to be destroied before
	     * it is deleted, since it creates a new scope.
	     *
	     * @return {void}
	     */
	    destory: function destory() {
	        if (this._scope) {
	            return this._scope.__destroy__(true);
	        } else {
	            return [0, 0];
	        }
	    }
	
	}, _Binding2.default).get();
	
	exports.default = AutoBinding;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _make2 = __webpack_require__(2);
	
	var _Parser = __webpack_require__(13);
	
	var _Util = __webpack_require__(15);
	
	/** @lends module:DataBinding.Binding.prototype */
	var Binding = {
	
	    /**
	     * @type {string[]}
	     */
	    properties: null,
	
	    /**
	     * @type {string}
	     */
	    originalNodeValue: '',
	
	    /**
	     * @type {Node}
	     */
	    node: null,
	
	    /**
	     * @type {Node}
	     */
	    parentNode: null,
	
	    /**
	     * @type {Boolean}
	     */
	    singleExpression: false,
	
	    /**
	     * The basic prototype for bindings. Any binding should inherit form this prototype.
	     *
	     * @constructs
	     * @return {void}
	     */
	    _make: function _make() {
	        this.properties = [];
	    },
	
	    /**
	     * updates a binding. The model will be checked for changes
	     * and new data will be applied to the binding target.
	     *
	     * @param  {module:DataBinding.ScopePrototype} scope the scope on which
	     *                                             this binding should operate.
	     *
	     * @return {void}
	     */
	    update: function update(scope) {
	        var text = this.originalNodeValue;
	        var localNode = { element: this.parentNode };
	        var values = this.properties.map(function (key) {
	            var item = { name: key, value: (0, _Parser.parseExpression)(key, localNode, scope) };
	
	            return item;
	        });
	
	        if (this.singleExpression) {
	            text = (0, _Parser.parseExpression)(text, localNode, scope);
	        } else {
	            values.forEach(function (pair) {
	                text = text.replace('{{' + pair.name + '}}', pair.value);
	            });
	        }
	
	        if ((0, _make2.hasPrototype)(this.node, window.Attr)) {
	            if (this.parentNode.getAttribute(this.node.name) !== text) {
	                (0, _Util.polyInvoke)(this.parentNode).setAttribute(this.node.name, text);
	            }
	        } else {
	            text = text.toString().replace(/ /g, ' ');
	
	            if (this.node.textContent !== text) {
	                this.node.textContent = text;
	            }
	        }
	    },
	
	    test: function test() {
	        return true;
	    }
	};
	
	exports.default = Binding;

/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * @module DataBinding/BindingRegistry
	 */
	
	/**
	 * Registry of all bindings.
	 *
	 * @type {Object}
	 */
	var registry = {};
	
	/**
	 * Public Singleton Interface for the binding registry.
	 *
	 * @class BindingRegistry
	 */
	/** @lends module:DataBinding/BindingRegistry~BindingRegistry.prototype */
	var BindingRegistry = {
	
	  /**
	   * @param {Binding} binding - new binding type
	   * @return {boolean} - success status
	   */
	  register: function register(binding) {
	    if (!registry[binding.name]) {
	      registry[binding.name] = binding;
	      return true;
	    } else {
	      console.warn("Binding type " + binding.name + " already exists!");
	      return false;
	    }
	  },
	
	  /**
	   * @param {string} name - binding name
	   * @return {Binding} - the binding for the given name
	   */
	  get: function get(name) {
	    return registry[name];
	  }
	};
	
	/**
	 * @member BindingRegistry
	 * @static
	 * @type module:DataBinding/BindingRegistry~BindingRegistry
	 */
	exports.default = BindingRegistry;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _make = __webpack_require__(2);
	
	var _Parser = __webpack_require__(13);
	
	var _Binding = __webpack_require__(17);
	
	var _Binding2 = _interopRequireDefault(_Binding);
	
	var _RenderEngine = __webpack_require__(20);
	
	var _RenderEngine2 = _interopRequireDefault(_RenderEngine);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ClassBinding = (0, _make.Make)( /** @lends module:DataBinding.ClassBinding.prototype */{
	
	    /**
	     * @type {Object}
	     */
	    classes: null,
	
	    /**
	     * @type {Node}
	     */
	    parentNode: null,
	
	    /**
	     * @constructs
	     * @extends {module:DataBinding.Binding}
	     */
	    _make: _Binding2.default._make,
	
	    /**
	     * applies a class to the parent node, based on the binding values.
	     *
	     * @param  {module:DataBinding.ScopePrototype} scope the scope to operate on.
	     * @param  {Object} classes class-expression-map
	     * @param  {string} key     the class name to apply
	     *
	     * @return {void}
	     */
	    applyClass: function applyClass(scope, classes, key) {
	        var expression = classes[key];
	        var value = (0, _Parser.parseExpression)(expression, scope);
	
	        key = key[0] === '!' ? key.substr(1) : key;
	
	        if (value) {
	            this.parentNode.classList.add(key);
	        } else {
	            this.parentNode.classList.remove(key);
	        }
	    },
	
	    update: function update(scope) {
	        var _this = this;
	
	        var classes = JSON.parse(JSON.stringify(this.classes));
	
	        Object.keys(classes).filter(function (key) {
	            return key.indexOf('!') === 0;
	        }).forEach(this.applyClass.bind(this, scope, classes));
	
	        _RenderEngine2.default.scheduleRenderTask(function () {
	            Object.keys(classes).filter(function (key) {
	                return key.indexOf('!') !== 0;
	            }).forEach(_this.applyClass.bind(_this, scope, classes));
	        });
	    }
	
	}, _Binding2.default).get();
	
	exports.default = ClassBinding;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _make = __webpack_require__(2);
	
	var _TaskList = __webpack_require__(21);
	
	var _TaskList2 = _interopRequireDefault(_TaskList);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/** @type {Function[]} */
	/**
	 * @module RenderEngine
	 */
	
	var preRenderHooks = [];
	
	/** @type {Function[]} */
	var postRenderHooks = [];
	
	/** @type {module:RenderEngine.TaskList} */
	var preRenderTasks = (0, _make.Make)(_TaskList2.default)();
	
	/** @type {module:RenderEngine.TaskList} */
	var renderTasks = (0, _make.Make)(_TaskList2.default)();
	
	/** @type {Function[]} */
	var postRenderTasks = [];
	
	/** @type {Function[]} */
	var nextPostRenderTasks = [];
	
	/** @type {boolean} */
	var active = false;
	
	/**
	 * performs all render tasks from one frame. This is one render cycle.
	 *
	 * @return {void}
	 */
	var renderCycle = function renderCycle() {
	  active = false;
	
	  // run all post render hooks after a frame has been painted. So this happens
	  // at the beginning of the next cycle.
	  postRenderHooks.forEach(function (hook) {
	    return hook();
	  });
	  postRenderTasks.forEach(function (task) {
	    return task();
	  });
	
	  // init render cycle.
	  // nothing at the moment.
	
	  // run the pre render hooks before we start to do render stuff.
	  preRenderHooks.forEach(function (hook) {
	    return hook();
	  });
	
	  // run pre render tasks
	  var tasks = preRenderTasks.tasks;
	  preRenderTasks.flush();
	  tasks.forEach(function (task) {
	    return task();
	  });
	
	  //run all render tasks.
	  tasks = renderTasks.tasks;
	  renderTasks.flush();
	  tasks.forEach(function (task) {
	    return task();
	  });
	
	  //finish rendering, final steps
	  postRenderTasks = nextPostRenderTasks;
	  nextPostRenderTasks = [];
	
	  // done wait for next frame.
	  scheduleNextFrame();
	};
	
	/**
	 * Schedules a new render cycle in the browsers rendeing engine.
	 * The cycle is performed as soon as the browser is ready to render a new frame.
	 *
	 * @return {void}
	 */
	var scheduleNextFrame = function scheduleNextFrame() {
	  if (!active && (postRenderHooks.length > 0 || preRenderHooks.length > 0 || renderTasks.length > 0 || postRenderTasks.length > 0 || nextPostRenderTasks.length > 0)) {
	    window.requestAnimationFrame(renderCycle);
	
	    active = true;
	  }
	};
	
	/**
	 * RenderEngine Singleton
	 *
	 * @namespace
	 */
	var RenderEngine = {
	
	  /**
	   * @param {Function} f a hook function to execute before each render cycle
	   * @return {Function} returns the function which has been passed in
	   */
	  addPreRenderHook: function addPreRenderHook(f) {
	    preRenderHooks.push(f);
	    scheduleNextFrame();
	
	    return f;
	  },
	
	  /**
	   * @param {Function} f - a hook function to execute after each render cycle
	   * @return {Function} returns the function which has been passed in.
	   */
	  addPostRenderHook: function addPostRenderHook(f) {
	    postRenderHooks.push(f);
	    scheduleNextFrame();
	
	    return f;
	  },
	
	  /**
	   * Removes a previously added pre render hook
	   *
	   * @param  {Function} f - the function which was previously added
	   * @return {*} - see Array.prototype.splice
	   */
	  removePreRenderHook: function removePreRenderHook(f) {
	    return preRenderHooks.splice(preRenderHooks.indexOf(f), 1);
	  },
	
	  /**
	   * Removes a previously added post render hook
	   *
	   * @param  {Function} f - the function which was previously added
	   * @return {*} {@link Array.prototype.splice}
	   */
	  removePostRenderHook: function removePostRenderHook(f) {
	    return postRenderHooks.splice(postRenderHooks.indexOf(f), 1);
	  },
	
	  /**
	   * @param {Function} f - the task to preform in the next render cycle.
	   * @param {string} [id] optional task id
	   * @return {Function} the function which has been passed in.
	   */
	  schedulePreRenderTask: function schedulePreRenderTask(f, id) {
	    preRenderTasks.push(f, id);
	    scheduleNextFrame();
	
	    return f;
	  },
	
	  /**
	   * @param {Function} f - the task to preform in the next render cycle.
	   * @param {string} [id] optional task id
	   * @return {Function} the function which has been passed in.
	   */
	  scheduleRenderTask: function scheduleRenderTask(f, id) {
	    renderTasks.push(f, id);
	    scheduleNextFrame();
	
	    return f;
	  },
	
	  /**
	   * @param {Function} f - the task to preform after the next render cycle.
	   * @return {Function} the function which has been passed in.
	   */
	  schedulePostRenderTask: function schedulePostRenderTask(f) {
	    nextPostRenderTasks.push(f);
	    scheduleNextFrame();
	
	    return f;
	  },
	
	  /**
	   * Forces the engine to render a new frame even if there are no tasks
	   *
	   * @return {void}
	   */
	  renderFrame: function renderFrame() {
	    if (!active) {
	      scheduleNextFrame();
	    }
	  }
	};
	
	/**
	 * @member {module:RenderEngine~RenderEngine} RenderEngine
	 * @static
	 */
	exports.default = RenderEngine;

/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	/** @lends module:RenderEngine.TaskList.prototype */
	var TaskList = {
	
	    /** @type Array */
	    tasks: null,
	
	    /** @type Array */
	    registeredIds: null,
	
	    /**
	     * Render TaskList to manage rendertaks and optionally track duplicates by ids.
	     *
	     * @constructs
	     * @return {void}
	     */
	    _make: function _make() {
	        this.tasks = [];
	        this.registeredIds = [];
	    },
	
	    /**
	     * adds a new item to the task list.
	     *
	     * @param  {Function} task the task to add to the list
	     * @param  {string} [id] the id of this tasks. If provided no task with the same id can be added again.
	     * @return {void}
	     */
	    push: function push(task, id) {
	        if (!id || this.registeredIds.indexOf(id) < 0) {
	            this.tasks.push(task);
	
	            if (id) {
	                this.registeredIds.push(id);
	            }
	        }
	    },
	
	    /** @type {number} */
	    get length() {
	        return this.tasks.length;
	    },
	
	    flush: function flush() {
	        this.tasks = [];
	        this.registeredIds = [];
	    }
	};
	
	exports.default = TaskList;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _make = __webpack_require__(2);
	
	var _Parser = __webpack_require__(13);
	
	var _Util = __webpack_require__(15);
	
	var _Binding = __webpack_require__(17);
	
	var _Binding2 = _interopRequireDefault(_Binding);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var EnabledBinding = (0, _make.Make)( /** @lends module:DataBinding.EnabledBinding# */{
	    /**
	     * @type {Node}
	     */
	    parentNode: null,
	
	    /**
	     * @constructs
	     * @extends {module:DataBinding.Binding}
	     */
	    _make: _Binding2.default._make,
	
	    /**
	     * @param {module:DataBinding.ScopePrototype} scope the scope to work on
	     * @return {void}
	     */
	    update: function update(scope) {
	        var value = (0, _Parser.parseExpression)(this.originalNodeValue, scope);
	
	        if (!value) {
	            (0, _Util.polyInvoke)(this.parentNode).setAttribute('disabled', '');
	        } else {
	            (0, _Util.polyInvoke)(this.parentNode).removeAttribute('disabled');
	        }
	    }
	
	}, _Binding2.default).get();
	
	exports.default = EnabledBinding;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Parser = __webpack_require__(13);
	
	var _Bind = __webpack_require__(12);
	
	/**
	 * @class ScopePrototype
	 * @memberof module:DataBinding
	 */
	
	/**
	 * @lends module:DataBinding.ScopePrototype.prototype
	 */
	var ScopePrototype = {
	
	    /**
	    * will apply the current state of the bound model.
	    *
	    * @param {function} [fn]            function to execute before rendering
	    * @param {boolean} [localRecycle]   only recycle the current scope
	    *
	    * @return {void}
	    */
	    __apply__: function __apply__(fn, localRecycle) {
	        if (fn) {
	            fn();
	        }
	
	        return (0, _Bind.recycle)(localRecycle ? this : null);
	    },
	
	    /**
	     * starts to watch the given expression and fires when the value changes.
	     *
	     * @param  {string}   expression the expression to watch
	     * @param  {Function} cb         will be called once the value changes
	     *
	     * @return {void}
	     */
	    __watch__: function __watch__(expression, cb) {
	        if (!_Bind.watcherList.has(this)) {
	            _Bind.watcherList.set(this, []);
	        }
	
	        _Bind.watcherList.get(this).push({
	            expression: expression,
	            cb: cb
	        });
	    },
	
	    /**
	     * destorys a scope
	     *
	     * @param  {boolean} inProgress whenever this is an initial call or not
	     *
	     * @return {boolean} status
	     */
	    __destroy__: function __destroy__(inProgress) {
	        return (0, _Bind.destoryScope)(this, inProgress);
	    },
	
	    /**
	    * resolves when the expression returns not undefined or null
	    *
	    * @param  {string|Function}   expression the expression to evaluate
	    *
	    * @return {Promise}                      resolves when stable
	    */
	    require: function require(expression) {
	        var _this = this;
	
	        return new Promise(function (done) {
	            var value = null;
	
	            if (typeof expression === 'function') {
	                value = expression();
	            } else {
	                value = (0, _Parser.parseExpression)(expression, _this);
	            }
	
	            if (value !== undefined && value !== null) {
	                done(value);
	            }
	        });
	    }
	};
	
	exports.default = ScopePrototype;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _make2 = __webpack_require__(2);
	
	var _Parser = __webpack_require__(13);
	
	var _Binding = __webpack_require__(17);
	
	var _Binding2 = _interopRequireDefault(_Binding);
	
	var _RenderEngine = __webpack_require__(20);
	
	var _RenderEngine2 = _interopRequireDefault(_RenderEngine);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * @param {StyleBinding} container - binding container
	 * @param {ScopePrototype} scope - the scope for this binding
	 * @return {void}
	 */
	/**
	 * @module DataBinding/StyleBinding
	 */
	
	var readStyleProperties = function readStyleProperties(container, scope) {
	    Object.keys(container.bindings).forEach(function (styleKey) {
	        var style = window.getComputedStyle(container.parentNode);
	        var dimensions = container.parentNode.getBoundingClientRect();
	
	        if (styleKey.split('.')[0] === 'dimensions') {
	            var value = dimensions[styleKey.split('.')[1]];
	
	            (0, _Parser.assignExpression)(container.bindings[styleKey], scope, value);
	        } else {
	            (0, _Parser.assignExpression)(container.bindings[styleKey], scope, style[styleKey]);
	        }
	    });
	};
	
	var StyleBinding = (0, _make2.Make)( /** @lends module:DataBinding/StyleBinding~StyleBinding# */{
	    bindings: null,
	
	    /**
	     * @constructs
	     * @extends {module:DataBinding.Binding}
	     *
	     * @return {void}
	     */
	    _make: function _make() {
	        this.bindings = (0, _Parser.ObjectParser)(this.bindings);
	    },
	
	    update: function update(scope) {
	        _RenderEngine2.default.schedulePostRenderTask(readStyleProperties.bind(null, this, scope));
	    }
	}, _Binding2.default).get();
	
	/**
	 * @member StyleBinding
	 * @type {module:DataBinding/StyleBinding~StyleBinding}
	 * @static
	 */
	exports.default = StyleBinding;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _make2 = __webpack_require__(2);
	
	var _Binding = __webpack_require__(17);
	
	var _Binding2 = _interopRequireDefault(_Binding);
	
	var _Parser = __webpack_require__(13);
	
	var _Bind = __webpack_require__(12);
	
	var _Util = __webpack_require__(15);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var TemplateRepeatBinding = (0, _make2.Make)( /** @lends module:DataBinding.TemplateRepeatBinding# */{
	
	    /**
	     * @type {WeakMap}
	     */
	    itemNodeList: null,
	
	    /**
	     * @type {WeakMap}
	     */
	    itemScopeList: null,
	
	    /**
	     * @type {Node}
	     */
	    template: null,
	
	    /**
	     * @type {Node}
	     */
	    marker: null,
	
	    /**
	     * @type {Array}
	     */
	    modelBackup: null,
	
	    /**
	     * @constructs
	     * @extends {Binding}
	     * @return {void}
	     */
	    _make: function _make() {
	        _Binding2.default._make.apply(this);
	
	        this.itemNodeList = new Map();
	        this.itemScopeList = new Map();
	        this.modelBackup = [];
	    },
	
	    /**
	     * renders one model item to the DOM
	     *
	     * @param  {*} model      [description]
	     * @param  {ScopePrototype} scope      [description]
	     * @param  {string} itemName   [description]
	     * @param  {DocumentFragment} fragment   [description]
	     * @param  {Node} polyParent [description]
	     * @param  {Object} item       [description]
	     * @param  {number} index      [description]
	     * @return {void}            [description]
	     */
	    renderItem: function renderItem(model, scope, itemName, fragment, polyParent, item, index) {
	        var node = null;
	
	        if (this.itemNodeList.has(item)) {
	            node = this.itemNodeList.get(item);
	            var childScope = this.itemScopeList.get(item);
	
	            childScope.$first = index === 0;
	            childScope.$last = model.length - 1 === index;
	            childScope.$index = index;
	        } else {
	            var _childScope = (0, _make2.Make)({
	                $first: index === 0,
	                $last: model.length - 1 === index,
	                $index: index,
	                __parentScope__: scope
	            }, scope).get();
	
	            _childScope[itemName] = item;
	
	            node = document.importNode(this.template.content, true).firstElementChild;
	            (0, _Bind.bindNode)(node, _childScope, true);
	
	            this.itemNodeList.set(item, node);
	            this.itemScopeList.set(item, _childScope);
	        }
	
	        fragment.appendChild(node);
	    },
	
	    update: function update(scope) {
	        var _this = this;
	
	        var _originalNodeValue$sp = this.originalNodeValue.split(' ');
	
	        var _originalNodeValue$sp2 = _slicedToArray(_originalNodeValue$sp, 3);
	
	        var itemName = _originalNodeValue$sp2[0];
	        var link = _originalNodeValue$sp2[1];
	        var expression = _originalNodeValue$sp2[2];
	
	        var model = (0, _Parser.parseExpression)(expression, scope);
	        var polyParent = this.template.getAttribute('bind-polymer-parent');
	        var dirty = false;
	
	        if (link !== 'in') {
	            console.console.error('DataBinding: invalide expression', this.originalNodeValue);
	            return;
	        }
	
	        model = model && Array.isArray(model) ? model : [];
	        dirty = this.modelBackup.length !== model.length;
	
	        if (!dirty) {
	            for (var i = 0; i < model.length; i++) {
	                if (model[i] !== this.modelBackup[i]) {
	                    dirty = true;
	                    break;
	                }
	            }
	        }
	
	        if (dirty) {
	            this.modelBackup.forEach(function (item) {
	                if (model.indexOf(item) < 0) {
	                    if (polyParent) {
	                        (0, _Util.polyInvoke)((0, _Util.getPolyParent)(_this.marker, polyParent)).removeChild(_this.itemNodeList.get(item));
	                    } else {
	                        (0, _Util.polyInvoke)(_this.marker.parentNode).removeChild(_this.itemNodeList.get(item));
	                    }
	
	                    _this.itemScopeList.delete(item);
	                    _this.itemNodeList.delete(item);
	                }
	            });
	
	            this.modelBackup = model.slice();
	
	            if (window.Polymer) {
	                window.Polymer.dom.flush();
	            }
	
	            /** @type {DocumentFragment} */
	            var fragment = new DocumentFragment();
	
	            model.forEach(this.renderItem.bind(this, model, scope, itemName, fragment, polyParent));
	
	            if (this.marker.nextElementSibling) {
	                if (polyParent) {
	                    (0, _Util.polyInvoke)((0, _Util.getPolyParent)(this.marker, polyParent)).insertBefore(fragment, this.marker.nextElementSibling);
	                } else {
	                    (0, _Util.polyInvoke)(this.marker.parentNode).insertBefore(fragment, this.marker.nextElementSibling);
	                }
	            } else {
	                if (polyParent) {
	                    (0, _Util.polyInvoke)((0, _Util.getPolyParent)(this.marker, polyParent)).appendChild(fragment);
	                } else {
	                    (0, _Util.polyInvoke)(this.marker.parentNode).appendChild(fragment);
	                }
	            }
	        }
	    },
	
	    destory: function destory() {
	        var _this2 = this;
	
	        var count = this.modelBackup.reduce(function (prev, item) {
	            var _prev = _slicedToArray(prev, 2);
	
	            var scopes = _prev[0];
	            var bindings = _prev[1];
	
	            var scope = _this2.itemScopeList.get(item);
	
	            var _scope$__destroy__ = scope.__destroy__(true);
	
	            var _scope$__destroy__2 = _slicedToArray(_scope$__destroy__, 2);
	
	            var scopes_add = _scope$__destroy__2[0];
	            var bindings_add = _scope$__destroy__2[1];
	
	
	            return [scopes + scopes_add, bindings + bindings_add];
	        }, [0, 0]);
	
	        this.itemScopeList = null;
	        this.itemNodeList = null;
	
	        return count;
	    }
	
	}, _Binding2.default).get();
	
	exports.default = TemplateRepeatBinding;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _make = __webpack_require__(2);
	
	var _Mapping = __webpack_require__(14);
	
	var _Parser = __webpack_require__(13);
	
	var _Util = __webpack_require__(15);
	
	var _Binding = __webpack_require__(17);
	
	var _Binding2 = _interopRequireDefault(_Binding);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * @class TwoWayBinding
	 * @extends module:DataBinding.Binding
	 * @memberof module:DataBinding
	 */
	
	var TwoWayBinding = (0, _make.Make)( /** @lends module:DataBinding.TwoWayBinding# */{
	    /**
	     * @type {string}
	     */
	    currentValue: '',
	
	    /**
	     * @type {Node}
	     */
	    parentNode: null,
	
	    /**
	     * @type {boolean}
	     */
	    indirect: false,
	
	    /**
	     * @type {string}
	     */
	    viewBinding: '',
	
	    update: function update(scope) {
	        var value = (0, _Parser.parseExpression)(this.properties[0], scope);
	        var attribute = _Mapping.attributeNames.rename(this.node.name);
	
	        if (!this.indirect) {
	            (0, _Util.polyInvoke)(this.parentNode).setAttribute(attribute, value);
	        } else {
	            var oldValue = (0, _Parser.parseExpression)(this.viewBinding, this.parentNode);
	
	            if (value !== oldValue) {
	                (0, _Parser.assignExpression)(this.viewBinding, this.parentNode, value);
	                this.currentValue = value;
	
	                if (document.activeElement === this.parentNode) {
	                    var range = document.createRange();
	                    var selection = window.getSelection();
	
	                    range.selectNodeContents(this.parentNode);
	                    range.collapse(false);
	                    selection.removeAllRanges();
	                    selection.addRange(range);
	                }
	            }
	        }
	    }
	}, _Binding2.default).get();
	
	exports.default = TwoWayBinding;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.importTemplate = undefined;
	
	var _make = __webpack_require__(2);
	
	var _NetworkRequest = __webpack_require__(28);
	
	var _NetworkRequest2 = _interopRequireDefault(_NetworkRequest);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//import { polyInvoke } from './Util.js';
	
	
	/*let FakeTemplate = {
	    _markup : '',
	    _fragment: null,
	
	    _make : function(markup) {
	        this._markup = markup;
	    },
	
	    get content() {
	        if (!this._fragment) {
	            this._fragment = new DocumentFragment();
	            let container = document.createElement('div');
	
	            polyInvoke(container).innerHTML = this._markup;
	
	            [].forEach.apply(container.childNodes, [element => {
	                polyInvoke(this._fragment).appendChild(element);
	            }]);
	        }
	        return this._fragment;
	    }
	};*/
	
	/**
	 * imports a template node from an external HTML file.
	 *
	 * @function
	 * 
	 * @param {string} source the url of the file that holds the template to import
	 * @param {HTMLTemplateElement} template the template element to contain the import
	 *
	 * @return {HTMLTemplateElement} returns the provided template node, but now holding the imported nodes.
	 */
	var importTemplate = exports.importTemplate = function importTemplate(source, template) {
	    var request = (0, _make.Make)(_NetworkRequest2.default)(source, {});
	
	    return request.send().then(function (markup) {
	        template.innerHTML = markup;
	
	        return template;
	    });
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/**
	 * @module NetworkRequest
	 */
	
	/**
	 * removes angulars hashKey property from an object
	 *
	 * @param {Object} object the object to operate on
	 *
	 * @return {Object} the initial object
	 */
	var stripHashKey = function stripHashKey(object) {
		if (Array.isArray(object)) {
			object = object.map(stripHashKey);
		} else {
			object = JSON.parse(JSON.stringify(object));
	
			Object.keys(object).forEach(function (key) {
				if (key == '$$hashKey') {
					delete object[key];
				} else if (_typeof(object[key]) === 'object') {
					object[key] = stripHashKey(object[key]);
				}
			});
		}
	
		return object;
	};
	
	/**
	 * @lends module:NetworkRequest.NetworkRequest#
	 */
	var NetworkRequest = {
		/**
	  * @private
	  * @type {Object}
	  */
		_body: {},
	
		/**
	  * @private
	  * @type {Object}
	  */
		_headers: null,
	
		/**
	  * @type {string}
	  */
		type: '',
	
		/**
	  * @type {string}
	  */
		method: '',
	
		/**
	  * @type {string}
	  */
		url: '',
	
		/**
	  * @type {function[]}
	  * @private
	  */
		_listeners: null,
	
		/**
	  * The constructor for the NetworkRequest. It simply sets up the properties.
	  *
	  * @constructs
	  *
	  * @param {string} url the url this request should be made to
	  * @param {Object} config addintional configuartion for the request
	  *
	  * @return {NetworkRequest} the request it self
	  */
		_make: function _make(url) {
			var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
			var _ref$method = _ref.method;
			var method = _ref$method === undefined ? 'GET' : _ref$method;
			var _ref$type = _ref.type;
			var type = _ref$type === undefined ? 'none' : _ref$type;
	
			this.type = type;
			this.method = method;
			this._headers = {};
			this.url = url;
			this._listeners = [];
		},
	
		/**
	  * this method will set the given object as the request body.
	  *
	  * @param {Object} data body data for this request
	  *
	  * @return {NetworkRequest} the request it self
	  */
		body: function body(data) {
			this._body = data;
	
			return this;
		},
	
		/**
	  * This method will set the request headers, in case custom headers are required.
	  *
	  * @param {Object} headers a object with all header properties for this request
	  *
	  * @return {NetworkRequest} the request it self
	  */
		headers: function headers(_headers) {
			this._headers = _headers;
	
			return this;
		},
	
		/**
	  * Sets a single header for this request.
	  *
	  * @param {string} key the header key
	  * @param {string} value the header value
	  *
	  * @return {NetworkRequest} the request it self
	  */
		setHeader: function setHeader(key, value) {
			this._headers[key] = value;
	
			return this;
		},
	
		/**
	  * sets a callback for when the request is ready
	  *
	  * @param {function} fn a callback function as soon as the data is ready
	  *
	  * @return {void}
	  */
		onReady: function onReady(fn) {
			this._listeners.push(fn);
		},
	
		/**
	  * This will actually create the network connection and initiate the request.
	  *
	  * @return {Promise} resolves when the request is done
	  */
		send: function send() {
			var _this = this;
	
			var self = this;
			var xhr = new XMLHttpRequest();
	
			if (this.method === 'GET' && this._body) {
				this.url += '?' + Object.keys(this._body).map(function (key) {
					return key + '=' + self._body[key];
				}).join('&');
			}
	
			xhr.open(this.method, this.url, true);
	
			var promise = new Promise(function (success, failure) {
				xhr.onreadystatechange = function () {
					if (xhr.readyState === 4) {
						if (xhr.status === 200) {
							var response = xhr.response;
	
							if (xhr.getResponseHeader('Content-Type').indexOf('application/json') > -1 && typeof response === 'string') {
								response = JSON.parse(response);
							}
	
							_this._listeners.forEach(function (fn) {
								return fn(xhr);
							});
	
							success(response);
						} else {
							failure(xhr);
						}
					}
				};
			});
	
			Object.keys(this._headers).forEach(function (key) {
				xhr.setRequestHeader(key, self._headers[key]);
			});
	
			if (this.type === 'json') {
				var body = this._body;
	
				xhr.setRequestHeader('Content-Type', 'application/json');
	
				if (body) {
					body = stripHashKey(body);
					body = JSON.stringify(body);
				}
	
				xhr.send(body);
			} else {
				xhr.send(this._body);
			}
	
			return promise;
		}
	};
	
	exports.default = NetworkRequest;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _DataBinding = __webpack_require__(10);
	
	var _make2 = __webpack_require__(2);
	
	var _Util = __webpack_require__(15);
	
	var _RenderEngine = __webpack_require__(20);
	
	var _RenderEngine2 = _interopRequireDefault(_RenderEngine);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * @module DataBinding/ViewPort
	 */
	
	var LIST_HAS_ITEMS = 0;
	
	/** @lends module:DataBinding/ViewPort.ViewPortInstance# */
	var ViewPortInstance = {
	
	    /**
	     * @private
	     * @type {module:DataBinding.ScopePrototype}
	     */
	    _scope: null,
	
	    /**
	     * @private
	     * @type {boolean}
	     */
	    _bound: false,
	
	    /**
	     * @private
	     * @type {module:DataBinding.ScopePrototype}
	     */
	    _innerScope: null,
	
	    /**
	     * @private
	     * @type {HTMLTemplateElement}
	     */
	    _originalTemplate: null,
	
	    /**
	     * @private
	     * @type {Application}
	     */
	    _application: null,
	
	    /**
	     * @constructs
	     *
	     * @param  {module:DataBinding.ScopePrototype} scope    the scope of this viewport instance
	     * @param  {Application} application the application this viewport instance belongs to
	     *
	     * @return {void}
	     */
	    _make: function _make(scope, application) {
	        this._scope = scope;
	        this._application = application;
	    },
	
	    /**
	     * binds the ViewPort to a scope so it can be filled with content
	     *
	     * @param  {Object} context a collection of properties to configure the viewport
	     *
	     * @return {Promise.<module:DataBinding/ViewPort.ViewPortInstance>}  promise for when the viewport is bound
	     */
	    bind: function bind(context) {
	        var _this = this;
	
	        return new Promise(function (done, error) {
	            if (!_this._bound) {
	                _RenderEngine2.default.schedulePostRenderTask(function () {
	                    _this._scope.templateUrl = context.template;
	                    _this._scope.overflow = '';
	                    _this._scope.__apply__();
	
	                    if (!_this._originalTemplate) {
	                        _this._originalTemplate = _this._scope.element.firstElementChild;
	                    }
	
	                    _this._innerScope = _DataBinding.DataBinding.makeTemplate(_this._originalTemplate, context.scope || {}, _this._application, _this._scope);
	
	                    _this._bound = true;
	
	                    context.scope = _this._innerScope;
	
	                    done(_this);
	                });
	            } else {
	                error('ViewPort: viewport is already bound!');
	            }
	        });
	    },
	
	    /**
	     * updates the inner scope of the viewport
	     *
	     * @param  {...*} args arguments to be passed on to {@link module:DataBinding.ScopePrototype#__apply__}
	     *
	     * @return {void}
	     */
	    update: function update() {
	        var _innerScope;
	
	        return (_innerScope = this._innerScope).__apply__.apply(_innerScope, arguments);
	    },
	
	    /**
	     * the scope if ViewPort content
	     *
	     * @type {module:DataBinding.ScopePrototype}
	     */
	    get scope() {
	        return this._innerScope;
	    },
	
	    destory: function destory() {
	        if (this._bound) {
	            this._innerScope.__destroy__();
	
	            while (this._scope.element.children.length > LIST_HAS_ITEMS) {
	                (0, _Util.polyInvoke)(this._scope.element).removeChild(this._scope.element.firstChild);
	            }
	
	            (0, _Util.polyInvoke)(this._scope.element).appendChild(this._originalTemplate);
	            this._bound = false;
	            this._originalTemplate.processed = false;
	        }
	    },
	
	    /**
	     * enables the viewport content to overflow the viewports bounds
	     *
	     * @return {void}
	     */
	    alowOverflow: function alowOverflow() {
	        this._scope.overflow = 'overflow';
	        this._scope.__apply__();
	    }
	};
	
	/**
	 * the interface for the ViewPort module
	 *
	 * @namespace
	 * @static
	 */
	var ViewPort = {
	
	    /**
	     * all instanciated ViewPorts
	     *
	     * @private
	     * @type {Map.<module:DataBinding.ScopePrototype>}
	     */
	    _elements: new Map(),
	
	    /**
	     * the applicaion the viewports are registered to
	     *
	     * @private
	     * @type {Application}
	     */
	    _application: null,
	
	    /**
	     * @constructs
	     * @param {Application} application - the application this viewport belongs to.
	     * @return {void}
	     */
	    _make: function _make(application) {
	        var _this2 = this;
	
	        var style = (0, _Util.polyInvoke)(document.head).appendChild(document.createElement('style'));
	        var template = document.createElement('template');
	
	        (0, _Util.polyInvoke)(style).innerHTML = '\n            .view-port {\n                position: relative;\n                left: 0;\n                top: 0;\n                height: 100%;\n                width: 100%;\n                display: flex;\n                flex-direction: column;\n                overflow: auto;\n            }\n\n            .view-port.overflow {\n                overflow: visible;\n            }\n        ';
	
	        template.id = 'view-port';
	        (0, _Util.polyInvoke)(template).setAttribute('bind-element', '');
	        (0, _Util.polyInvoke)(template).setAttribute('component', '');
	
	        (0, _Util.polyInvoke)(template).innerHTML = '\n            <div class="custom-element {{overflow}}">\n                <template src="templateUrl" replace></template>\n            </div>\n        ';
	
	        application.on('newElement:view-port', function (scope) {
	            _this2._elements[scope.name] = (0, _make2.Make)(ViewPortInstance)(scope, application);
	            application.emit('viewPort:ready:' + scope.name);
	        });
	
	        this._application = application;
	
	        _DataBinding.DataBinding.makeTemplate(template, function () {
	            return {};
	        }, application);
	    },
	
	    /**
	     * fetches a viewPort instance by a name
	     *
	     * @param  {string} name the name to look for
	     *
	     * @return {Promise.<module:DataBinding.ScopePrototype>}  the matching scope
	     */
	    getInstance: function getInstance(name) {
	        var _this3 = this;
	
	        return new Promise(function (success) {
	            if (_this3._elements[name]) {
	                success(_this3._elements[name]);
	            } else {
	                _this3._application.on('viewPort:ready:' + name, function () {
	                    return success(_this3._elements[name]);
	                });
	            }
	        });
	    },
	
	    /**
	     * destorys an viewPort instance
	     *
	     * @param  {module:DataBinding/ViewPort.ViewPortInstance} instance the instance to destroy
	     *
	     * @return {void}
	     */
	    free: function free(instance) {
	        this._elements[instance._scope.name] = null;
	
	        instance._scope.__destroy__();
	    }
	};
	
	exports.default = ViewPort;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _make2 = __webpack_require__(2);
	
	var _Parser = __webpack_require__(13);
	
	var _Binding = __webpack_require__(17);
	
	var _Binding2 = _interopRequireDefault(_Binding);
	
	var _BindingRegistry = __webpack_require__(18);
	
	var _BindingRegistry2 = _interopRequireDefault(_BindingRegistry);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var IfBinding = (0, _make2.Make)( /** @lends module:DataBinding.IfBinding# **/{
	
	    /** @type {string} */
	    name: 'bind-if',
	
	    /**
	     * @type {Node}
	     */
	    parentNode: null,
	
	    /**
	     * @type {Node}
	     */
	    node: null,
	
	    /**
	     * @type {Node}
	     */
	    nextSibling: null,
	
	    /**
	     *
	     * @constructs
	     * @extends {Binding}
	     * @param {Node} parentNode - this node
	     * @param {string} text - the attribute value
	     * @param {ScopeInfo} scopeInfo - bindings container
	     *
	     * @return {void}
	     */
	    _make: function _make(_ref) {
	        var parentNode = _ref.parentNode;
	        var text = _ref.text;
	        var scopeInfo = _ref.scopeInfo;
	
	        this.node = parentNode;
	        this.parentNode = this.node.parentNode;
	        this.text = text;
	        this.nextSibling = parentNode.nextSibling;
	
	        scopeInfo.bindings.push(this);
	    },
	
	    update: function update(scope) {
	        var isTrue = (0, _Parser.parseExpression)(this.text, scope);
	
	        if (isTrue) {
	            if (this.node.parentNode !== this.parentNode) {
	                if (this.nextSibling) {
	                    this.parentNode.insertBefore(this.node, this.nextSibling);
	                } else {
	                    this.parentNode.appendChild(this.node);
	                }
	            }
	        } else {
	            if (this.node.parentNode === this.parentNode) {
	                this.parentNode.removeChild(this.node);
	            }
	        }
	    }
	
	}, _Binding2.default).get();
	
	_BindingRegistry2.default.register(IfBinding);
	
	exports.default = IfBinding;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _make2 = __webpack_require__(2);
	
	var _Parser = __webpack_require__(13);
	
	var _Binding = __webpack_require__(17);
	
	var _Binding2 = _interopRequireDefault(_Binding);
	
	var _BindingRegistry = __webpack_require__(18);
	
	var _BindingRegistry2 = _interopRequireDefault(_BindingRegistry);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ElementToScopeBinding = (0, _make2.Make)( /** @lends module:DataBinding.ElementToScopeBinding.prototype */{
	
	    /**
	     * @type {string}
	     */
	    name: 'scope-id',
	
	    /**
	     * @type {Node}
	     */
	    parentNode: null,
	
	    /**
	     * @constructs
	     * @extends {module:DataBinding.Binding}
	     *
	     * @param  {Node} parentNode   parent node of this binding
	     * @param  {Object} scopeInfo  scope metadata object
	     * @param  {string} text       original text value of the binding
	     *
	     * @return {void}
	     */
	    _make: function _make(_ref) {
	        var parentNode = _ref.parentNode;
	        var scopeInfo = _ref.scopeInfo;
	        var text = _ref.text;
	
	        _Binding2.default._make.apply(this);
	
	        this.parentNode = parentNode;
	        this.text = text;
	
	        scopeInfo.bindings.push(this);
	    },
	
	    update: function update(scope) {
	        /** @type {Node} */
	        var currentValue = (0, _Parser.parseExpression)(this.text, scope);
	
	        if (currentValue !== this.parentNode) {
	            (0, _Parser.assignExpression)(this.text, scope, this.parentNode);
	            scope.__apply__(null, true);
	        }
	    }
	
	}, _Binding2.default).get();
	
	_BindingRegistry2.default.register(ElementToScopeBinding);
	
	exports.default = ElementToScopeBinding;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _make2 = __webpack_require__(2);
	
	var _Parser = __webpack_require__(13);
	
	var _Binding = __webpack_require__(17);
	
	var _Binding2 = _interopRequireDefault(_Binding);
	
	var _BindingRegistry = __webpack_require__(18);
	
	var _BindingRegistry2 = _interopRequireDefault(_BindingRegistry);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var AttributeBinding = (0, _make2.Make)({
	
	    name: 'bind-attr',
	
	    config: null,
	
	    _make: function _make(_ref) {
	        var parentNode = _ref.parentNode;
	        var scopeInfo = _ref.scopeInfo;
	        var text = _ref.text;
	
	        _Binding2.default._make.apply(this);
	
	        this.parentNode = parentNode;
	        this.config = (0, _Parser.ObjectParser)(text);
	
	        scopeInfo.bindings.push(this);
	    },
	
	    update: function update(scope) {
	        var attrName = this.config.name;
	        var attrValue = this.config.value ? (0, _Parser.parseExpression)(this.config.value, scope) : '';
	        var attrEnabled = this.config.enabled ? (0, _Parser.parseExpression)(this.config.enabled, scope) : true;
	
	        if (attrEnabled) {
	            this.parentNode.setAttribute(attrName, attrValue);
	        } else {
	            this.parentNode.removeAttribute(attrName);
	        }
	    }
	
	}, _Binding2.default).get();
	
	_BindingRegistry2.default.register(AttributeBinding);
	
	exports.default = AttributeBinding;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _DataBinding = __webpack_require__(10);
	
	var _DataBinding2 = _interopRequireDefault(_DataBinding);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/** @lends Header# */
	var Header = {
	    view: null,
	
	    /** @type {application} */
	    application: null,
	
	    get notConnected() {
	        /** @type {Socket} */
	        var socket = this.application.socket;
	
	        return !socket.isOnline || !socket.isConnected;
	    },
	
	    get connected() {
	        var socket = this.application.socket;
	
	        return socket.isOnline && socket.isConnected;
	    },
	
	    get connectionStatus() {
	        var socket = this.application.socket;
	
	        if (!socket.isOnline) {
	            return 'offline';
	        } else if (!socket.isConnected && socket.isConnecting) {
	            return 'connecting...';
	        } else {
	            return 'diconnected';
	        }
	    },
	
	    _make: function _make(application) {
	        this.application = application;
	
	        var scope = _DataBinding2.default.makeTemplate('#header-status', {
	            view: this
	        }).scope;
	
	        this.application.socket.onStatusChange(scope.__apply__.bind(scope, null, true));
	    }
	};
	
	exports.default = Header;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _DataBinding = __webpack_require__(10);
	
	var _DataBinding2 = _interopRequireDefault(_DataBinding);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var LoginDialog = {
	
	    /** @type module:DataBinding.ScopePrototype */
	    _scope: null,
	    _account: null,
	
	    get active() {
	        return this._account.busy;
	    },
	
	    /**
	     * [userNameField description]
	     *
	     * @type {HTMLInputElement}
	     */
	    userNameField: null,
	
	    /**
	     * [passwordField description]
	     *
	     * @type {HTMLInputElement}
	     */
	    passwordField: null,
	
	    username: '',
	    password: '',
	
	    usernameError: '',
	    passwordError: '',
	
	    get isOpen() {
	        return !this._account.credentialsReady || this.active;
	    },
	
	    get isNotActive() {
	        return !this.active;
	    },
	
	    get isValid() {
	        return this.usernameField.validate() && this.passwordField.validate();
	    },
	
	    _make: function _make(account) {
	        this._scope = _DataBinding2.default.makeTemplate('#login-dialog', { view: this }).scope;
	        this._account = account;
	
	        this._account.on('statusChange', this._scope.__apply__.bind(this._scope));
	    },
	
	    login: function login() {
	        if (this.view.isValid) {
	            this.view._account.authenticate(this.view.username, this.view.password);
	        }
	    },
	
	    getErrorMessage: function getErrorMessage(element, error) {
	        element = element.querySelector('input');
	
	        return element.validationMessage || error;
	    },
	
	
	    preventDefault: function preventDefault(event) {
	        event.preventDefault();
	    }
	
	};
	
	exports.default = LoginDialog;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _DataBinding = __webpack_require__(10);
	
	var _DataBinding2 = _interopRequireDefault(_DataBinding);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var MessageList = {
	
	    currentMessages: [{
	        type: 'out',
	        content: 'hey mein Schatz wo bist du?',
	        timestamp: '1473194720625'
	    }, {
	        type: 'out',
	        content: 'hey 😞😔😕',
	        timestamp: '1473194783059'
	    }, {
	        type: 'in',
	        content: 'was',
	        timestamp: '1473194821597'
	    }, {
	        type: 'in',
	        content: 'was',
	        timestamp: '1473194821597'
	    }, {
	        type: 'in',
	        content: 'was',
	        timestamp: '1473194821597'
	    }],
	
	    _make: function _make() {
	        _DataBinding2.default.makeTemplate('#message-list', { view: this });
	    }
	};
	
	exports.default = MessageList;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _make2 = __webpack_require__(2);
	
	var PushManager = (0, _make2.Make)( /** @lends PushManager */{
	
	    platform: '',
	
	    serviceStatus: '',
	
	    _newPushHandler: null,
	    _registerHandler: null,
	
	    /**
	     * [_handleServiceError description]
	     *
	     * @callback
	     * @param  {Object} data [description]
	     *
	     * @return {void}      [description]
	     */
	    _handleServiceError: function _handleServiceError(data) {
	        this.serviceStatus = 'init failed';
	        console.console.error('push service failed:', data);
	    },
	
	    _baiduHandleServiceReady: function _baiduHandleServiceReady(data) {
	        this._register(data.clientId);
	
	        this.serviceStatus = 'OK';
	        console.log('baidu push is ready', data);
	    },
	
	    _handleMessageError: function _handleMessageError(data) {
	        console.error('push message error:', data);
	    },
	
	    _make: function _make() {
	        if (!!window.cordova && window.cordova.platformId === 'android') {
	            this.platform = 'android';
	        } else if (!!navigator.push) {
	            this.platform = 'firefoxos';
	        }
	
	        this._newPushHandler = [];
	        this._registerHandler = [];
	    },
	
	    _newMessage: function _newMessage() {
	        this._newPushHandler.forEach(function (fn) {
	            return fn();
	        });
	    },
	
	    _register: function _register(token) {
	        this._registerHandler.forEach(function (fn) {
	            return fn(token);
	        });
	    },
	
	    _registerServiceSimple: function _registerServiceSimple(force) {
	        navigator.push.registrations().onsuccess = function (e) {
	            if (e.target.result.length === 0 && force) {
	                e.target.result.forEach(function (enpoint) {
	                    return navigator.push.unregister(enpoint);
	                });
	
	                var request = navigator.push.register();
	                request.onsuccess = this._simpleHandleServiceReady;
	                request.onerror = this._handleServiceError;
	            }
	        };
	    },
	
	    init: function init() {
	        var _this = this;
	
	        if (this.platform === 'android') {
	            window.baiduPush.startWork('KGQvyGtzWRG6X48cSAwf5Mxk', this._baiduHandleServiceReady.bind(this), this._handleServiceError.bind(this));
	            window.baiduPush.onNotificationArrived(this._newMessage.bind(this), this._handleMessageError.bind(this));
	        } else if (this.platform === 'firefoxos') {
	            this._registerServiceSimple();
	            navigator.mozSetMessageHandler('push', this._newMessage.bind(this));
	            navigator.mozSetMessageHandler('push-register', function () {
	                return _this._registerServiceSimple(true);
	            });
	        }
	    },
	
	    onPush: function onPush(fn) {
	        this._newPusHandler.push(fn);
	    },
	
	    onRegister: function onRegister(fn) {
	        this._registerHandler.push(fn);
	    },
	
	    setRegistrationFailed: function setRegistrationFailed() {
	        this.serviceStatus = 'unable to register push service';
	    }
	})();
	
	exports.default = PushManager;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _make2 = __webpack_require__(2);
	
	var ScreenManager = (0, _make2.Make)( /** @lends ScreenManager */{
	
	    applicationIsActive: false,
	
	    _make: function _make() {
	        var _this = this;
	
	        this.applicationIsActive = !document.hidden;
	
	        document.addEventListener('visibilitychange', function () {
	            _this.applicationIsActive = !document.hidden;
	
	            console.log('application is ', _this.applicationIsActive ? 'active' : 'inactive', 'now');
	        });
	
	        document.addEventListener('resume', function (e) {
	            console.log('application has resumed', e);
	        });
	    }
	})();
	
	exports.default = ScreenManager;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _uuid = __webpack_require__(39);
	
	var uuid = _interopRequireWildcard(_uuid);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var Socket = {
	
	    _host: '',
	    _hostId: 0,
	
	    /** @type {WebSocket} */
	    _websocket: null,
	    _online: false,
	    _connected: false,
	    _connecting: false,
	    _stop: false,
	    _onStatusChange: null,
	
	    _decelerate: null,
	    _decelerateTimeout: 0,
	    _decelerateMaxTimeout: 30,
	
	    get isConnected() {
	        return this._connected;
	    },
	
	    set isConnected(value) {
	        this._connected = value;
	        this._statusChange();
	    },
	
	    get isConnecting() {
	        return this._connecting;
	    },
	
	    set isConnecting(value) {
	        this._connecting = value;
	        this._statusChange();
	    },
	
	    get isOnline() {
	        return this._online;
	    },
	
	    set isOnline(value) {
	        this._online = value;
	        this._statusChange();
	    },
	
	    _make: function _make(_ref) {
	        var _this = this;
	
	        var host = _ref.host;
	
	        this._host = host;
	        this._onceQueue = {};
	        this._listeners = {};
	        this._onStatusChange = [];
	        this._connectedHandler = [];
	
	        this.isOnline = navigator.onLine;
	
	        window.addEventListener('online', function () {
	            _this.isOnline = navigator.onLine;
	            console.log('Socket: online');
	            _this.init();
	        });
	
	        window.addEventListener('offline', function () {
	            _this.isOnline = navigator.onLine;
	            console.log('Socket: offline');
	            _this.reconnect();
	        });
	    },
	
	    _ack: function _ack(messageId) {
	        this._websocket.send(JSON.stringify({
	            type: 'ack:' + messageId,
	            id: uuid.v5('0', window.performance.now())
	        }));
	    },
	
	    _onMessage: function _onMessage(message) {
	        message = JSON.parse(message.data);
	        console.log('Socket: new message received', message.type);
	
	        if (message.type.search('ack') < 0) {
	            this._ack(message.id);
	        }
	
	        if (this._onceQueue[message.type]) {
	            this._onceQueue[message.type].forEach(function (fn) {
	                return fn(message);
	            });
	            this._onceQueue[message.type] = [];
	        }
	
	        if (this._listeners[message.type]) {
	            this._listeners.forEach(function (fn) {
	                return fn(message);
	            });
	        }
	    },
	
	    _statusChange: function _statusChange() {
	        this._onStatusChange.forEach(function (fn) {
	            return fn();
	        });
	    },
	
	    _onceQueue: null,
	    _listeners: null,
	    _connectedHandler: null,
	
	    sendMessage: function sendMessage(type, message) {
	        var _this2 = this;
	
	        var data = {
	            id: uuid.v5('0', window.performance.now()),
	            data: message,
	            type: type
	        };
	
	        var promise = new Promise(function (success, failure) {
	            /**    let timeoutId = setTimeout(() => {
	                    console.warn('Socket: connection timed out! dropping connection!');
	                    this.reconnect();
	                    failure();
	                }, 10000); */
	
	            /**            this.once(`ack:${data.id}`, () => {
	                            clearTimeout(timeoutId);
	                        });*/
	
	            _this2.once('response:' + data.id, function (message) {
	                success(message);
	            });
	        });
	
	        promise.catch(function () {
	            return _this2.reconnect();
	        });
	
	        console.log('Socket: message sent', data.id);
	        this._websocket.send(JSON.stringify(data));
	
	        return promise;
	    },
	
	    reconnect: function reconnect() {
	        if (this.isConnected) {
	            this._websocket.close();
	        }
	    },
	
	    init: function init() {
	        var _this3 = this;
	
	        if (this.isOnline && !this.decelerate && !this._stop) {
	
	            this.isConnecting = true;
	            this._decelerate = setTimeout(function () {
	                console.log('trying to establish a connection...');
	                _this3._decelerate = null;
	                _this3._websocket = new WebSocket('ws://' + _this3._host[_this3._hostId]);
	
	                _this3._websocket.onopen = function () {
	                    _this3.isConnected = true;
	                    _this3.isConnecting = false;
	                    _this3._decelerateTimeout = 0;
	                    console.log('connection established!');
	
	                    _this3._connectedHandler.forEach(function (fn) {
	                        return fn();
	                    });
	                };
	
	                _this3._websocket.onerror = function (error) {
	                    console.error('websocket error:', error);
	                    this.isConnecting = false;
	                };
	
	                _this3._websocket.onclose = function () {
	                    // socket closed restart
	                    _this3._hostId += 1;
	                    _this3._decelerateTimeout += 1;
	
	                    if (_this3._hostId > _this3._host.length - 1) {
	                        _this3._hostId = 0;
	                    }
	
	                    if (_this3._decelerateTimeout > _this3._decelerateMaxTimeout) {
	                        _this3._decelerateTimeout = _this3._decelerateMaxTimeout;
	                    }
	
	                    console.warn('websocket disconnected! Retry in ' + _this3._decelerateTimeout + 's to ' + _this3._host[_this3._hostId]);
	                    _this3.isConnected = false;
	                    _this3.init();
	                };
	
	                _this3._websocket.onmessage = _this3._onMessage.bind(_this3);
	            }, this._decelerateTimeout * 1000);
	        }
	
	        this._stop = false;
	    },
	
	    once: function once(type, fn) {
	        if (!this._onceQueue[type]) {
	            this._onceQueue[type] = [];
	        }
	
	        this._onceQueue[type].push(fn);
	    },
	
	    on: function on(type, fn) {
	        if (!this._listeners[type]) {
	            this._listeners[type] = [];
	        }
	
	        this._listeners[type].push(fn);
	    },
	
	    onStatusChange: function onStatusChange(fn) {
	        this._onStatusChange.push(fn);
	    },
	
	    /**
	     * [connected description]
	     *
	     * @param  {Function} fn [description]
	     *
	     * @return {void}      [description]
	     */
	    connected: function connected(fn) {
	        this._connectedHandler.push(fn);
	    },
	
	    disconnect: function disconnect() {
	        this._stop = true;
	        this._websocket.close();
	    }
	};
	
	exports.default = Socket;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.v5 = exports.parse = undefined;
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _make2 = __webpack_require__(2);
	
	var _sha = __webpack_require__(40);
	
	var _sha2 = _interopRequireDefault(_sha);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * @module Uuid
	 */
	
	var UUID_SIZE = 16; // 16 byte / 128 bit
	
	/** @lends module:Uuid~ReadBytesOfHexString# */
	var ReadBytesOfHexString = {
	
	    /**
	     * the remaining hex string data
	     *
	     * @type {string}
	     */
	    _value: null,
	
	    /**
	     * [_make description]
	     *
	     * @constructs
	     *
	     * @param  {string} value a hex string
	     *
	     * @return {void}
	     */
	    _make: function _make(value) {
	        this._value = value;
	    },
	
	    /**
	     * reads the lowest byte from the hex string, expecting bigendian notation.
	     *
	     * @return {number} uint8
	     */
	    readByte: function readByte() {
	        var byte = parseInt(this._value.substring(this._value.length - 2), 16);
	        this._value = this._value.substring(0, this._value.length - 2);
	
	        return byte >>> 0;
	    }
	};
	
	var hex8Bit = function hex8Bit(value) {
	    while (value.length * 4 < 8) {
	        value = '0' + value;
	    }
	
	    return value;
	};
	
	var hex16Bit = function hex16Bit(value) {
	    while (value.length * 4 < 16) {
	        value = '0' + value;
	    }
	
	    return value;
	};
	
	var hex32Bit = function hex32Bit(value) {
	    while (value.length * 4 < 32) {
	        value = '0' + value;
	    }
	
	    return value;
	};
	
	var hex48Bit = function hex48Bit(value) {
	    while (value.length * 4 < 32) {
	        value = '0' + value;
	    }
	
	    return value;
	};
	
	var parse = exports.parse = function parse(uuid) {
	    var index = 0;
	    var buffer = new Uint8Array(UUID_SIZE);
	
	    var _uuid$split = uuid.split('-');
	
	    var _uuid$split2 = _slicedToArray(_uuid$split, 5);
	
	    var time_low = _uuid$split2[0];
	    var time_mid = _uuid$split2[1];
	    var time_hi_and_version = _uuid$split2[2];
	    var clock_seq = _uuid$split2[3];
	    var node = _uuid$split2[4];
	
	
	    var pushToBuffer = function pushToBuffer(byte) {
	        buffer[index++] = parseInt(byte, 16);
	    };
	
	    hex32Bit(time_low || '').match(/.{1,2}/g).reverse().forEach(pushToBuffer);
	    hex16Bit(time_mid || '').match(/.{1,2}/g).reverse().forEach(pushToBuffer);
	    hex16Bit(time_hi_and_version || '').match(/.{1,2}/g).reverse().forEach(pushToBuffer);
	    hex16Bit(clock_seq || '').match(/.{1,2}/g).reverse().forEach(pushToBuffer);
	    hex48Bit(node || '').match(/.{1,2}/g).reverse().forEach(pushToBuffer);
	
	    return buffer.buffer;
	};
	
	/**
	 * [v5 description]
	 *
	 * @param  {string} namespace the name space of the new uuid
	 * @param  {string} name      the name of the resource of this uuid
	 *
	 * @return {string}           uuid string
	 */
	var v5 = exports.v5 = function v5(namespace, name) {
	    var nameValue = new ArrayBuffer(name.length);
	    var namespaceValue = parse(namespace);
	    var completeValue = new Uint8Array(nameValue.byteLength + namespaceValue.byteLength);
	    var uuidBuffer = new Uint8Array(UUID_SIZE);
	    var view = null;
	    var hash = null;
	
	    view = new Uint8Array(nameValue);
	
	    for (var i = 0; i < name.length; i++) {
	        view[i] = name.charCodeAt(i);
	    }
	
	    completeValue.set(new Uint8Array(namespaceValue), 0);
	    completeValue.set(new Uint8Array(nameValue), namespaceValue.byteLength);
	
	    hash = (0, _sha2.default)(completeValue.buffer);
	    hash = (0, _make2.Make)(ReadBytesOfHexString)(hash);
	
	    //time_low (0 - 3)
	    for (var _i = 0; _i < 4; _i++) {
	        uuidBuffer[_i] = hash.readByte();
	    }
	
	    // time_mid (4 - 5)
	    for (var _i2 = 4; _i2 < 6; _i2++) {
	        uuidBuffer[_i2] = hash.readByte();
	    }
	
	    // time_hi_and_version (6 - 7)
	    for (var _i3 = 6; _i3 < 8; _i3++) {
	        uuidBuffer[_i3] = hash.readByte();
	    }
	
	    uuidBuffer[7] = uuidBuffer[7] & 0x0F | 0x50;
	
	    // clock_seq_hi_and_reserved (8)
	    uuidBuffer[8] = hash.readByte() & 0x3F | 0x80;
	
	    // clock_seq_low (9)
	    uuidBuffer[9] = hash.readByte();
	
	    // node (10 - 15)
	    for (var _i4 = 10; _i4 < 16; _i4++) {
	        uuidBuffer[_i4] = hash.readByte();
	    }
	
	    var time_low = hex8Bit(uuidBuffer[3].toString(16)) + hex8Bit(uuidBuffer[2].toString(16)) + hex8Bit(uuidBuffer[1].toString(16)) + hex8Bit(uuidBuffer[0].toString(16));
	    var time_mid = hex8Bit(uuidBuffer[5].toString(16)) + hex8Bit(uuidBuffer[4].toString(16));
	    var time_hi_and_version = hex8Bit(uuidBuffer[7].toString(16)) + hex8Bit(uuidBuffer[6].toString(16));
	    var clock_seq_hi_and_reserved = hex8Bit(uuidBuffer[8].toString(16));
	    var clock_seq_low = hex8Bit(uuidBuffer[9].toString(16));
	    var node = hex8Bit(uuidBuffer[15].toString(16)) + hex8Bit(uuidBuffer[14].toString(16)) + hex8Bit(uuidBuffer[13].toString(16)) + hex8Bit(uuidBuffer[12].toString(16)) + hex8Bit(uuidBuffer[11].toString(16)) + hex8Bit(uuidBuffer[10].toString(16));
	
	    return time_low + '-' + time_mid + '-' + time_hi_and_version + '-' + clock_seq_hi_and_reserved + clock_seq_low + '-' + node;
	};

/***/ },
/* 40 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	/**
	 * casts any number to an unsigned 32-bit integer
	 *
	 * @param  {number} value any numeric value
	 *
	 * @return {number}       an int32 number
	 */
	var uint32 = function uint32(value) {
	    //cast to integer
	    value = value | 0;
	
	    //make value unsigned
	    value = value >>> 0;
	
	    //limit to 32 bit
	    value = value % Math.pow(2, 32);
	
	    return value;
	};
	
	/**
	 * rotates the bits of an uint32 value to the left.
	 *
	 * @param  {number} value should be uint to prevent unwanted side effects
	 * @param  {number} amount the amount of bits to shift <= 32
	 *
	 * @return {number}       the rotated value already casted to uint32
	 */
	var leftRotateBits = function leftRotateBits(value, amount) {
	    value = value << amount | value >>> 32 - amount;
	    value = uint32(value);
	
	    return value;
	};
	
	/**
	 * makes sure a hex value is 32-bit long.
	 *
	 * @param  {string} value a hex string
	 *
	 * @return {string}       a hex string which is definetely 32-bit long
	 */
	var hex32Bit = function hex32Bit(value) {
	    while (value.length * 4 < 32) {
	        value = '0' + value;
	    }
	
	    return value;
	};
	
	/**
	 * makes sure a hex value is 32-bit long.
	 *
	 * @param  {string} value a hex string
	 *
	 * @return {string}       a hex string which is definetely 32-bit long
	 */
	var hex64Bit = function hex64Bit(value) {
	    while (value.length * 4 < 64) {
	        value = '0' + value;
	    }
	
	    return value;
	};
	
	/**
	 * creates a new array buffer from the utf-8 encoded string.
	 *
	 * @param  {string} value the original value
	 *
	 * @return {ArrayBuffer}       the encoded value
	 */
	var stringToBuffer = function stringToBuffer(value) {
	    // make sure every character is only 8 bit long
	    value = unescape(encodeURIComponent(value));
	
	    var bufferView = new Uint8Array(value.length);
	
	    // push message into buffer
	    for (var i = 0; i < value.length; i++) {
	        bufferView[i] = value.charCodeAt(i);
	    }
	
	    return bufferView.buffer;
	};
	
	/**
	 * the sha-1 algorithm.
	 *
	 * @param  {(ArrayBuffer|string)} message the message to hash
	 *
	 * @return {string}         the hex representation of the hash value
	 */
	var sha1 = function sha1(message) {
	
	    if (typeof message === 'string') {
	        message = stringToBuffer(message);
	    }
	
	    // initial values
	    var h0 = 0x67452301;
	    var h1 = 0xEFCDAB89;
	    var h2 = 0x98BADCFE;
	    var h3 = 0x10325476;
	    var h4 = 0xC3D2E1F0;
	
	    var messageLength = message.byteLength;
	    var bufferSize = 0;
	    var buffer = null;
	    var view = null;
	
	    // calculate buffer size. First in bit and then convert to byte.
	    bufferSize = (messageLength + 1) * 8;
	    bufferSize = bufferSize + (448 - bufferSize % 512) + 64;
	    bufferSize = bufferSize / 8;
	    buffer = new ArrayBuffer(bufferSize);
	    view = new Uint8Array(buffer);
	
	    //apply data to our local buffer
	    view.set(new Uint8Array(message), 0);
	
	    // append the 1 bit. No idea why this is not just a single bit.
	    view[messageLength] = 0x80;
	
	    //reorder bytes
	    for (var i = 0; i < messageLength + 1; i += 4) {
	        var temp = 0;
	
	        temp = view[i];
	        view[i] = view[i + 3];
	        view[i + 3] = temp;
	
	        temp = view[i + 1];
	        view[i + 1] = view[i + 2];
	        view[i + 2] = temp;
	    }
	
	    //append the message length
	    view = new Uint32Array(buffer);
	    var length = hex64Bit((messageLength * 8).toString(16));
	    view[view.length - 2] = parseInt(length.substring(0, length.length - 8), 16);
	    view[view.length - 1] = parseInt(length.substring(length.length - 8), 16);
	
	    // process each chunk
	    for (var _i = 0; _i < bufferSize / (512 / 8); _i++) {
	        var a = h0;
	        var b = h1;
	        var c = h2;
	        var d = h3;
	        var e = h4;
	        var _temp = 0;
	
	        view = new Uint32Array(80);
	        view.set(new Uint32Array(buffer.slice(_i * 512, (_i + 1) * 512)), 0);
	
	        for (var _i2 = 16; _i2 < 80; _i2++) {
	            view[_i2] = leftRotateBits(view[_i2 - 3] ^ view[_i2 - 8] ^ view[_i2 - 14] ^ view[_i2 - 16], 1);
	        }
	
	        for (var _i3 = 0; _i3 < 80; _i3++) {
	            var f = null;
	            var k = null;
	
	            if (_i3 > -1 && _i3 < 20) {
	                f = uint32(b & c ^ ~b & d);
	                k = 0x5A827999;
	            } else if (_i3 > 19 && _i3 < 40) {
	                f = uint32(b ^ c ^ d);
	                k = 0x6ED9EBA1;
	            } else if (_i3 > 39 && _i3 < 60) {
	                f = uint32(b & c ^ b & d ^ c & d);
	                k = 0x8F1BBCDC;
	            } else if (_i3 > 59 && _i3 < 80) {
	                f = uint32(b ^ c ^ d);
	                k = 0xCA62C1D6;
	            }
	
	            _temp = uint32(leftRotateBits(a, 5) + f + e + k + view[_i3]);
	            e = uint32(d);
	            d = uint32(c);
	            c = leftRotateBits(b, 30);
	            b = uint32(a);
	            a = uint32(_temp);
	        }
	
	        h0 = uint32(h0 + a);
	        h1 = uint32(h1 + b);
	        h2 = uint32(h2 + c);
	        h3 = uint32(h3 + d);
	        h4 = uint32(h4 + e);
	    }
	
	    return hex32Bit(h0.toString(16)) + hex32Bit(h1.toString(16)) + hex32Bit(h2.toString(16)) + hex32Bit(h3.toString(16)) + hex32Bit(h4.toString(16));
	};
	
	exports.default = sha1;

/***/ }
/******/ ]);
//# sourceMappingURL=app.map