const fs = require('fs');
const path = require('path');
const build = require('./builders');

console.log('Starting watcher');
const watch = () => {
    fs.watch('src', async (event, file) => {
        const extension = path.extname(file);
        if (extension != '.html') await build();
    });
}

build()
.then(watch);