import { Make } from '../af/util/make.js';

let ScreenManager = Make(/** @lends ScreenManager */{

    applicationIsActive: false,

    _make: function() {
        this.applicationIsActive = !document.hidden;

        document.addEventListener('visibilitychange', () => {
            this.applicationIsActive = !document.hidden;

            console.log('application is ', this.applicationIsActive ? 'active' : 'inactive', 'now');
        });

        document.addEventListener('resume', (e) => {
            console.log('application has resumed', e);
        });
    }
})();

export default ScreenManager;
