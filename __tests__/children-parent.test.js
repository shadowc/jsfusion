import { Runtime } from '../dist/runtime.min';
import BasicComponent from './components/basic-component';
import ChildComponent from './components/counter-component';
import { assertComponentRegistry, findRegistry } from './helpers/assert-component-helpers';
import {assertComponentChildren, assertComponentParent, assertComponentParents} from './helpers/assert-children-helper';

import './helpers/mutation-observer-mock';

let JsFusion;

beforeEach(() => {
    expect(Runtime).not.toBe(null);

    JsFusion = new Runtime();

    expect(typeof(JsFusion.version)).toBe('string');
});

it('Shows 1 children if a component is added as a child component', () => {
    JsFusion.registerComponent('basic', BasicComponent);
    JsFusion.registerComponent('child', ChildComponent);

    document.body.innerHTML = '<div id="parent" data-component="basic"><div id="child" data-component="child"></div></div>';

    JsFusion.start();

    const registerData = {
        parent: {
            name: 'basic',
            instance: BasicComponent,
            element: document.getElementById('parent'),
        },
        child: {
            name: 'child',
            instance: ChildComponent,
            element: document.getElementById('child'),
        },
    };

    assertComponentRegistry([ registerData.parent, registerData.child ], JsFusion);

    assertComponentChildren(
        findRegistry(registerData.parent, JsFusion).component,
        [ChildComponent],
    );

    assertComponentParent(
        findRegistry(registerData.child, JsFusion).component,
        BasicComponent,
    );

    assertComponentParents(
        findRegistry(registerData.child, JsFusion).component,
        { basic: BasicComponent },
    );
});

it('Shows 2 children if a component has 2 children added', () => {
    JsFusion.registerComponent('basic', BasicComponent);
    JsFusion.registerComponent('child', ChildComponent);

    document.body.innerHTML = `<div id="parent" data-component="basic">
        <div id="child1" data-component="child"></div>
        <div id="child2" data-component="child"></div>
    </div>`;

    JsFusion.start();

    const registerData = {
        parent: {
            name: 'basic',
            instance: BasicComponent,
            element: document.getElementById('parent'),
        },
        child1: {
            name: 'child',
            instance: ChildComponent,
            element: document.getElementById('child1'),
        },
        child2: {
            name: 'child',
            instance: ChildComponent,
            element: document.getElementById('child2'),
        }
    };

    assertComponentRegistry([registerData.parent, registerData.child1, registerData.child2], JsFusion);

    assertComponentChildren(
        findRegistry(registerData.parent, JsFusion).component,
        [ChildComponent, ChildComponent],
    );

    assertComponentParent(
        findRegistry(registerData.child1, JsFusion).component,
        BasicComponent,
    );

    assertComponentParents(
        findRegistry(registerData.child1, JsFusion).component,
        { basic: BasicComponent },
    );

    assertComponentParent(
        findRegistry(registerData.child2, JsFusion).component,
        BasicComponent,
    );

    assertComponentParents(
        findRegistry(registerData.child2, JsFusion).component,
        { basic: BasicComponent },
    );
});

it('it registers only one child when the second child is inside another component', () => {
    JsFusion.registerComponent('basic', BasicComponent);
    JsFusion.registerComponent('child', ChildComponent);

    document.body.innerHTML = `<div id="parent" data-component="basic">
        <div id="child1" data-component="child">
            <div id="child2" data-component="child"></div>
        </div>
    </div>`;

    JsFusion.start();

    const registerData = {
        parent: {
            name: 'basic',
            instance: BasicComponent,
            element: document.getElementById('parent'),
        },
        child1: {
            name: 'child',
            instance: ChildComponent,
            element: document.getElementById('child1'),
        },
        child2: {
            name: 'child',
            instance: ChildComponent,
            element: document.getElementById('child2'),
        }
    };

    assertComponentRegistry([registerData.parent, registerData.child1, registerData.child2], JsFusion);

    assertComponentChildren(
        findRegistry(registerData.parent, JsFusion).component,
        [ChildComponent],
    );

    assertComponentParent(
        findRegistry(registerData.child1, JsFusion).component,
        BasicComponent,
    );

    assertComponentParents(
        findRegistry(registerData.child1, JsFusion).component,
        { basic: BasicComponent },
    );

    assertComponentChildren(
        findRegistry(registerData.child1, JsFusion).component,
        [ChildComponent],
    );

    assertComponentParent(
        findRegistry(registerData.child2, JsFusion).component,
        ChildComponent,
    );

    assertComponentParents(
        findRegistry(registerData.child2, JsFusion).component,
        { child: ChildComponent },
    );
});

it('Registers 2 parents when one component has 2 parents', () => {
    JsFusion.registerComponent('basic', BasicComponent);
    JsFusion.registerComponent('child', ChildComponent);

    document.body.innerHTML = `<div id="parent" data-component="basic child">
        <div id="child" data-component="child"></div>
    </div>`;

    JsFusion.start();

    const registerData = {
        parent1: {
            name: 'basic',
            instance: BasicComponent,
            element: document.getElementById('parent'),
        },
        parent2: {
            name: 'child',
            instance: ChildComponent,
            element: document.getElementById('parent'),
        },
        child: {
            name: 'child',
            instance: ChildComponent,
            element: document.getElementById('child'),
        }
    };

    assertComponentRegistry([registerData.parent1, registerData.parent2, registerData.child], JsFusion);

    assertComponentParent(
        findRegistry(registerData.child, JsFusion).component,
        BasicComponent,
    );

    assertComponentParents(
        findRegistry(registerData.child, JsFusion).component,
        { basic: BasicComponent, child: ChildComponent },
    );

    assertComponentChildren(
        findRegistry(registerData.parent1, JsFusion).component,
        [ChildComponent],
    );

    assertComponentChildren(
        findRegistry(registerData.parent2, JsFusion).component,
        [ChildComponent],
    );
});
