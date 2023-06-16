import { writeFile } from 'fs/promises';
import { createRequire } from 'module';
import pug from 'pug';

const photosPath = '../../src/photos.json';
const require = createRequire(import.meta.url);

const getPhotos = () => {
    delete require.cache[require.resolve(photosPath)];
    const photos = require(photosPath);
    return photos;
}

export default async () => {
    console.log('PUG: rendering template');

    const photos = getPhotos();
    const html = pug.renderFile('src/index.pug', { photos });
    await writeFile('src/index.html', html);

    console.log('PUG: finished');
}
