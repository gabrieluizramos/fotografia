import build, { buildByExtension } from './builders/index.js';
import { env } from 'process';

const extension = env.BUILDER;
if (extension) {
    buildByExtension(extension);
} else {
    build();
}