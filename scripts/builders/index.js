import buildPug from './pug.js';
import buildImages from './images.js';

export const ALL = 'all';
export const SKIP = '.thumb.webp';

const byExtension = {
    '.pug': buildPug,
    '.json': buildPug,
    '.webp': buildImages,
    '.jpg': () => buildImages('image'),
    [ALL]: [buildPug, buildImages]
};

export default async (extension) => {
    const builder = byExtension[extension];
    if (!builder) return;
    if (!Array.isArray(builder)) return builder();

    try {
        console.log('BUILD: starting');

        const builds = builder.map(build => build());
        await Promise.all(builds);

        console.log('BUILD: finished');
    } catch (err) {
        console.log('Build: Error', err);
        throw err;
    }
}
