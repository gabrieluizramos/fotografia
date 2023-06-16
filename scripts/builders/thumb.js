import { promisify } from 'util';
import Glob from 'glob';
import sharp from 'sharp';

const { glob: globSync } = Glob;
const glob = promisify(globSync);

const getThumbPath = path => {
    const structure = path.split('/');
    const file = structure.at(-1);
    const [name, _extension] = file.split('.');
    const thumb = `${name}.thumb.webp`;

    structure[structure.length - 1] = thumb;

    return structure.join('/');
};
const findImages = () => glob('src/images/**/*[!.thumb].jpg');
const processImage = (file, output) => sharp(file).resize({ width: 280 }).webp({ effort: 6 }).toFile(output);
const processImages = async (files) => {
    const processing = files.map((file) => {
        const output = getThumbPath(file);
        return processImage(file, output);
    });
    return Promise.all(processing);
};

export default () => {
    console.log('THUMB: generating, please wait');
    return findImages()
    .then(processImages)
    .then(() => console.log('THUMB: finished'));
}
