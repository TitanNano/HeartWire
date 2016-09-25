

const Message = {
    _account: null,

    constructor(data, account) {
        Object.assign(this, data);
        this._account = account;

        return this;
    },

    get inOrOut() {
        return this._account && (this.from === this._account.id ? 'out' : 'in');
    },

    export() {
        return JSON.parse(JSON.stringify(this, (key, value) => {
            return (key.indexOf('_') !== 0 || key === '_id') ? value : null;
        }));
    },

    clone() {
        return Object.create(Message).constructor(this, this._account);
    }
};

export default Message;
