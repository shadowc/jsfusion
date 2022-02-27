import { Runtime, Component } from '../dist/runtime.min';
import { readFileSync } from 'fs';
import { resolve } from 'path';

import './mutation-observer-mock';

let JsFusion;

beforeAll(() => {
    expect(Runtime).not.toBe(null);
    expect(Component).not.toBe(null);

    JsFusion = new Runtime();

    expect(typeof(JsFusion.version)).toBe('string');
});

it('Can import and use the Runtime object, it exposes the version in package.json', () => {
    const packageVersion = JSON.parse(readFileSync(resolve('./package.json')).toString()).version;

    expect(JsFusion.version).toEqual(packageVersion);
});

class StandardComponent extends Component {}

it('Can create and register a component', () => {
    JsFusion.registerComponent('standardComponent', StandardComponent);

    expect(JsFusion.components['standardComponent']).not.toBeUndefined();
    expect(JsFusion.components['standardComponent']).toBe(StandardComponent);
});
