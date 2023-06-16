import pug from './pug.js';
import thumb from './thumb.js';

export const ALL = 'all';
const byExtension = {
    '.pug': pug,
    '.json': pug,
    '.jpg': thumb,
    [ALL]: [pug, thumb]
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
