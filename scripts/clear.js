const { promisify } = require('util');
const fs = require('fs');

let glob = require('glob');
glob = promisify(glob);

console.log('CLEAR: clearing building artifacts');
glob('src/images/**/*.thumb.*')
.then(files => files.map(file => fs.unlinkSync(file)))
.then(() => console.log('CLEAR: done'))
.catch(err => console.error('CLEAR: error', err));