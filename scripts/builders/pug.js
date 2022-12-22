const fs = require('fs')
const pug = require('pug');

module.exports = () => {
    return new Promise((resolve) => {
        console.log('PUG: rendering template');
        const photos = require('../../src/photos.json');
        const html = pug.renderFile('src/index.pug', { photos });
        fs.writeFileSync('src/index.html', html);
        console.log('PUG: finished');

        resolve();
    })
}