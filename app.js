const path = require('path');
const os = require('os');
const fs = require('fs');
const { Logger } = require('./logger');
const http = require('http');

// Path module
const pathObj = path.parse(__filename);
console.log('Current file name:', pathObj.base);

// OS module
const total_memory_mb = Math.round(os.totalmem() / 1024 / 1024);
const free_memory_mb = Math.round(os.freemem() / 1024 / 1024);
console.log(`Current machine has ${free_memory_mb} MB memory free of available ${total_memory_mb} MB`);

// File System module
fs.readdir('./', (err, files) => {
    if (err) {
        console.log('Error', err);
        return;
    }

    console.log(`Current directory has the files: ${files.join(', ')}`);
});

// HTTP module
const logger = new Logger();
const server = http.createServer((req, res) => {
    logger.log(`New request on ${req.url}`);
    if (req.url === '/') {
        res.write('Hello world!');
        res.end();
    }
});
server.listen(3000);
server.on('connection', (socket) => {
    logger.log('New connection to server');
});
console.log('Server is up, listening on port 3000...');