//(function (exports, require, module, __filename, __dirname) {
const EventEmitter = require('events');

class Logger extends EventEmitter {
    #messageId = 0;
    #url = '';

    constructor(url = 'http://example.com/logs/') {
        super();

        this.#url = url;

        this.on('messageLogged', ({ id, url } = {}) => {
            console.log(`Loggind message, ID=${id}, ${url}`);
        });
    }

    log(message) {
        console.log(message);
        this.emit('messageLogged', { id: this.#messageId++, url: this.#url })
    }
}

exports.Logger = Logger;
//})