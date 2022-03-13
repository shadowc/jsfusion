# Installation and Setup

To use JsFusion you should install this via npm packages:

`npm install jsfusion`;

or

`yarn add jsfusion`;

And use it in your main `app.js` file (or the file that is loaded by every
page in your site) by importing its runtime:

`JavaScript`
```javascript
import { Runtime } from 'jsfusion';
// Import your jsfusion components here
import Counter from './components/counter';  

// Create one (and only one isntance of the runtime)
const JsFusion = new Runtime();

// Register your components, giving them a name
JsFusion.registerComponent('counter', Counter);

// Finally start the engine!
JsFusion.start();
```

That is all you need! Now JsFusion will look through your DOM structure and
observe changes to it (much like Stimulus) to instantiate and manage the
different Components on your page.
