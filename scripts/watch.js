import { watch } from 'fs';
import { extname } from 'path';

import build, { ALL } from './builders/index.js';

const watcher = () => {
    console.log('Starting watcher');

    watch('src', { recursive: true }, async (_event, file) => {
        const extension = extname(file);
        await build(extension);
    });
}

build(ALL)
.then(watcher);
