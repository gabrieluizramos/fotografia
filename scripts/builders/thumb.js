const { promisify } = require('util');

const sharp = require('sharp');
let glob = require('glob');
glob = promisify(glob);

const getThumbPath = path => {
    const structure = path.split('/');
    const file = structure[structure.length - 1];
    const [name, ext] = file.split('.');
    const thumb = `${name}.thumb.webp`;

    structure[structure.length - 1] = thumb;

    return structure.join('/');
};
const findImages = () => glob('src/images/**/*[!.thumb].jpg');
const processImage = (path, output) => sharp(path).resize({ width: 280 }).webp({ effort: 6 }).toFile(output);
const processImages = async (paths) => {
    for await (path of paths) {
        const output = getThumbPath(path);
        await processImage(path, output);
    }
};

module.exports = () => {
    console.log('THUMB: generating');
    return findImages()
    .then(processImages)
    .then(() => console.log('THUMB: finished'));
}
