const fs = require('fs');
const pug = require('pug');

const photosPath = '../../src/photos.json';
const getPhotos = () => {
    delete require.cache[require.resolve(photosPath)];
    const photos = require(photosPath);
    return photos;
}

module.exports = () => {
    return new Promise((resolve) => {
        console.log('PUG: rendering template');
        const photos = getPhotos();
        const html = pug.renderFile('src/index.pug', { photos });
        fs.writeFileSync('src/index.html', html);
        console.log('PUG: finished');

        resolve();
    });
}