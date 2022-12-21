const fs = require('fs')
const pug = require('pug');

module.exports = () => {
    const photos = require('../src/photos.json');
    const html = pug.renderFile('src/index.pug', { photos });
    fs.writeFileSync('src/index.html', html);
}