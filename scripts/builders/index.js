const thumb = require('./thumb');
const pug = require('./pug');

module.exports = async () => {
    try {
        console.log('BUILD: starting');
        await pug();
        await thumb();
        console.log('BUILD: finished');
    } catch (err) {
        console.log('Build: Error', err);
    }
}