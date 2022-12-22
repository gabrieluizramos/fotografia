const fs = require('fs');
const path = require('path');
const build = require('./build');

console.log('Starting watcher');
fs.watch('src', async (event, file) => {
    const extension = path.extname(file);
    if (extension != '.html') await build();
});