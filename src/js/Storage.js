import { Make } from '../af/util/make.js';
import IndexedDB from '../af/modules/IndexedDB.js';


const db = Make(IndexedDB)('HeartWireStorage');
const MAGIC_CHUNK_SIZE = 20;

db.define(1)
    .store({
        name: 'messages',
        keyPath: '_id',
        unique: true,
    })
        .index('userMessagesOut', ['date', 'to', '_id'])
        .index('userMessagesIn', ['date', 'from', '_id'])

    .store({
        name: 'users',
        keyPath: '_id',
        unique: true,
    })
        .index('userName', 'userName')
        .index('userId', '_id');

window.db = db;

const Storage = {
    getMessages(userId, afterMessageId) {
        if (!afterMessageId) {
            return db.read('messages')
                .where('userMessagesIn')
                    .equals([null, userId, null])
                .or('userMessagesOut')
                    .to([null, userId, null])
                .sort('DESC')
                .get(MAGIC_CHUNK_SIZE).catch(e => console.error(e));
        } else {
            return db.read('messages')
                .where('userMessagesIn')
                    .equals([null, userId, null])
                    .lowerThan([null, null, afterMessageId])
                .or('userMessagesOut')
                    .equals([null, userId, null])
                    .lowerThan([null, null, afterMessageId])
                    .sort('DESC')
                    .get(MAGIC_CHUNK_SIZE).catch(e => console.log(e));
        }
    },

    getUserDataById(userId) {
        return db.read('users')
            .where('userId')
            .equals(userId)
            .get().then(([user]) => user);
    },

    getUserDataByUserName(userName) {
        return db.read('users')
            .where('userName')
            .equals(userName)
            .get().then(([user]) => user).catch(e => console.error(e));
    },

    setUserData(data) {
        return db.write('users', data).catch(e => console.error(e))
    },

    /**
     * @param {Message} message []
     *
     * @returns {Promise<*>} []
     */
    storeMessage(message) {
        return db.write('messages', message).catch(e => console.error(e));
    }
};

export default Storage;
