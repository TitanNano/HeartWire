import DataBinding from '../af/modules/DataBinding.js';

let MessageList = {

    currentMessages: [
        {
            type: 'out',
            content: 'hey mein Schatz wo bist du?',
            timestamp: '1473194720625',
        },
        {
            type: 'out',
            content: 'hey 😞😔😕',
            timestamp: '1473194783059',
        },
        {
            type: 'in',
            content: 'was',
            timestamp: '1473194821597',
        },
        {
            type: 'in',
            content: 'was',
            timestamp: '1473194821597',
        },
        {
            type: 'in',
            content: 'was',
            timestamp: '1473194821597',
        }
    ],

    _make: function() {
        DataBinding.makeTemplate('#message-list', { view: this });
    }
};

export default MessageList;
