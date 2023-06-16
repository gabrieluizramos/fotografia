import { promisify } from 'util';
import { unlinkSync } from 'fs';
import syncGlob from 'glob';

const glob = promisify(syncGlob);

console.log('CLEAR: clearing building artifacts');
glob('src/images/**/*.thumb.*')
.then(files => files.map(file => unlinkSync(file)))
.then(() => unlinkSync('src/index.html'))
.then(() => console.log('CLEAR: done'))
.catch(err => console.error('CLEAR: error', err));