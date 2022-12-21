const fs = require('fs');
const build = require('./build');

fs.watch('src', build);