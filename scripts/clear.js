import { unlink } from 'fs/promises';
import { glob } from 'glob';

console.log('CLEAR: clearing building artifacts');
try {
    const files = await glob('src/**/*.{thumb.*,html}');
    const removal = files.map(file => unlink(file));
    await Promise.all(removal);

    console.log('CLEAR: done');
} catch (err) {
    console.error('CLEAR: error', err);
    throw err;
}
