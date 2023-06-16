import build from './builders/index.js';
import { env } from 'process';

build(env.TARGET);
