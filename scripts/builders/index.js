import thumb from './thumb.js';
import pug from './pug.js';

const builders = {
    '.pug': pug,
    '.jpg': thumb,
    '.json': pug
};

export const buildByExtension = (extension) => {
    const builder = builders[extension];

    if (builder) return builder();
};

export default async () => {
    try {
        console.log('BUILD: starting');
        await pug();
        await thumb();
        console.log('BUILD: finished');
    } catch (err) {
        console.log('Build: Error', err);
        throw err;
    }
}