import EventTarget from '../af/core/prototypes/EventTarget';
import Platform from './Platform';

/** @lends ScreenManager */
let ScreenManager = {

    applicationIsActive: false,

    constructor() {
        super._make.apply(this);

        this.applicationIsActive = !document.hidden;

        document.addEventListener('visibilitychange', () => {
            this.applicationIsActive = !document.hidden;

            this.applicationIsActive ? this.emit('active') : this.emit('inactive');

            console.log('application is', this.applicationIsActive ? 'active' : 'inactive', 'now');
        });

        document.addEventListener('resume', (e) => {
            console.log('application has resumed', e);
        });

        return this;
    },

    updateThemeColor(color) {
        const colorSet = {
            'blue': '#2196f3',
            'pink': '#e91e63',
            'green': '#4caf50',
        };

        color = colorSet[color];

        document.head.querySelector('meta[name="theme-color"]').content = color;

        if (Platform.isCordova) {
            window.StatusBar.backgroundColorByHexString(color);
        }
    },

    __proto__: EventTarget,
};

export default ScreenManager.constructor();
