import { writeFile, readFile } from 'fs/promises';
import { glob } from 'glob';
import pug from 'pug';

const getFileContent = async (path) => {
    const file = await readFile(path);
    const content = JSON.parse(file);

    return content;
}

const getConfiguration = async () => {
    const files = await glob('src/config/*.json');

    let configs = files.map(async file => {
        const name = file.split('/').at(-1).split('.').at(0);
        const content = await getFileContent(file);
        return [name, content];
    })

    configs = await Promise.all(configs);
    configs = Object.fromEntries(configs);

    return configs;
}

export default async () => {
    console.log('PUG: rendering template');

    const options = await getConfiguration();
    const html = pug.renderFile('src/index.pug', options);
    await writeFile('src/index.html', html);

    console.log('PUG: finished');
}
