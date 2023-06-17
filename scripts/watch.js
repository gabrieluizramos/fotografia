import { watch } from 'fs';
import { extname } from 'path';

import build, { ALL, SKIP } from './builders/index.js';

const watcher = () => {
    console.log('Starting watcher');

    watch('src', { recursive: true }, async (_event, file) => {
        if (file.includes(SKIP)) return;
        const extension = extname(file);

        await build(extension);
    });
}

build(ALL)
.then(watcher);
