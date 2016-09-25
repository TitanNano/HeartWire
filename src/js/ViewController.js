
const ViewController = {

    subscribe(...models) {
        models.forEach(model => {
            model.on('ready', this._scope.__apply__);
            model.on('change', this._scope.__apply__);
        });
    }

};

export default ViewController;
