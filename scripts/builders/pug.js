import { writeFileSync } from 'fs';
import { createRequire } from 'module';
import pug from 'pug';

const photosPath = '../../src/photos.json';
const require = createRequire(import.meta.url);

const getPhotos = () => {
    delete require.cache[require.resolve(photosPath)];
    const photos = require(photosPath);
    return photos;
}

export default () => {
    return new Promise((resolve) => {
        console.log('PUG: rendering template');
        const photos = getPhotos();
        const html = pug.renderFile('src/index.pug', { photos });
        writeFileSync('src/index.html', html);
        console.log('PUG: finished');

        resolve();
    });
}