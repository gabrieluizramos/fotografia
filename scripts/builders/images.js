import { glob } from 'glob';
import { extname, basename, join } from 'path';
import sharp from 'sharp';

const globs = {
    image: {
        input: 'src/images/**/*.jpg',
        output: '.webp'
    },
    thumb: {
        input: 'src/images/**/*[!.thumb].webp',
        output: '.thumb.webp'
    }
}

const getOutputFile = (type, path) => {
    const name = basename(path, extname(path));

    const extension = globs[type].output;
    const output = `${name}${extension}`;

    const structure = path.split('/');
    structure.pop();

    return join(...structure, output);
};
const findImages = (type) => glob(globs[type].input);
const processImage = (type, file, output) => {
    let processing = sharp(file);

    if (type === 'thumb') processing = processing.resize({ width: 280 });

    processing = processing.webp({ effort: 6 }).toFile(output);

    return processing;
}
const processImages = async (type, files) => {
    const processing = files.map((file) => {
        const output = getOutputFile(type, file);
        return processImage(type, file, output);
    });
    return Promise.all(processing);
};

export default async (type = 'thumb') => {
    console.log(`IMAGES: generating ${type}, please wait`);

    const images = await findImages(type);
    if (!images.length) return console.log('IMAGES: no images found');

    await processImages(type, images);

    console.log('IMAGES: finished');
}
