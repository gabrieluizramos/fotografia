const fs = require('fs');
const path = require('path');
const builders = require('./builders');

console.log('Starting watcher');
fs.watch('src', async (event, file) => {
    const extension = path.extname(file);
    if (extension != '.html') await builders();
});