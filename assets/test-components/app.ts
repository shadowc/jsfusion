import { Runtime } from '../runtime';
import Counter from './counter';

const JsFusion = new Runtime();
JsFusion.registerComponent('counter', Counter);
JsFusion.start();

console.log(JsFusion);
