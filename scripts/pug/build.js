const fs = require('fs')
const pug = require('pug');

const photos = require('../../src/photos.json');
const html = pug.renderFile('src/index.pug', { photos });

fs.mkdirSync('build');
fs.writeFileSync('build/index.html', html);