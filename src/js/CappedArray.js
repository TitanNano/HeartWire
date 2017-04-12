
const CappedArray = {

    capacity: 0,

    get length() { return this._list.length; },

    _list: null,

    constructor(capacity = 1000) {
        this.capacity = capacity;
        this._list = [];

        return this;
    },

    push(...elements) {
        if ((this._list.length + elements.length) > this.capacity) {
            let overflow = this._list.length + elements - this._list.capacity;

            for (let i = overflow; i > 0; i--) {
                this._list.sift();
            }
        }

        return this._list.push(...elements);
    },

    getList() {
        return this._list.slice();
    },

    getItem(index) {
        return this._list[index];
    }
};

export default CappedArray;
