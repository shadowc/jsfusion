import { Runtime } from 'jsfusion';
import Counter from './test-components/counter';

const JsFusion = new Runtime();
JsFusion.registerComponent('counter', Counter);
JsFusion.start();

console.log(JsFusion);
