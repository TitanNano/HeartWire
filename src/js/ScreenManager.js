import EventTarget from '../af/core/prototypes/EventTarget';
import Platform from './Platform';

/** @lends ScreenManager */
let ScreenManager = {

    applicationIsActive: false,

    constructor() {
        super._make.apply(this);

        this.applicationIsActive = !document.hidden;

        document.addEventListener('visibilitychange', () => {
            this._updateAppVisibilityState(!document.hidden);
        });


        document.addEventListener('resume', () => {
            console.log('application has resumed');
            this._updateAppVisibilityState(true);
        });

        document.addEventListener('pause', () => {
            console.log('application has paused');
            this._updateAppVisibilityState(false);
        })

        return this;
    },

    _updateAppVisibilityState(state) {
        this.applicationIsActive = state;

        this.applicationIsActive ? this.emit('active') : this.emit('inactive');

        console.log('application is', this.applicationIsActive ? 'active' : 'inactive', 'now');
    },

    updateThemeColor(color) {
        const colorSet = {
            'blue': '#2196f3',
            'pink': '#e91e63',
            'green': '#4caf50',
        };

        color = colorSet[color];

        document.head.querySelector('meta[name="theme-color"]').content = color;

        if (Platform.isCordova && window.StatusBar) {
            window.StatusBar.backgroundColorByHexString(color);
        }
    },

    notifyScreenReady() {
        console.log('screen should be ready...');

        if (Platform.isCordova) {
            navigator.splashscreen.hide();
        }
    },

    __proto__: EventTarget,
};

export default ScreenManager.constructor();
