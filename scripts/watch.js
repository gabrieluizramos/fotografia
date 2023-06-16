import { watch } from 'fs';
import { extname } from 'path';

import build, { buildByExtension } from './builders/index.js';

const watcher = () => {
    console.log('Starting watcher');
    watch('src', {recursive: true}, async (_event, file) => {
        const extension = extname(file);
        await buildByExtension(extension);
    });
}

build()
.then(watcher);