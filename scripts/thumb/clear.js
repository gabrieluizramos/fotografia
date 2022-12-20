const { promisify } = require('util');
const fs = require('fs');
let glob = require('glob');
glob = promisify(glob);

glob('src/images/**/*.thumb.*')
.then(files => {
    files.map(file => fs.unlinkSync(file))
});