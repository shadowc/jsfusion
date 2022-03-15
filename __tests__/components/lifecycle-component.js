import { Component } from '../../dist/runtime.min';

export default class extends Component {
    setPropTypes() {
        return {
            hello: {
                type: String,
                defaultValue: 'Hello World',
            },
        };
    }

    onCreated() {
        const div = document.createElement('div');
        div.innerHTML = '<div id="on-created">Component Created</div>';
        document.body.appendChild(div);
    }

    onPropChanged(oldProps, newProps, propName) {
        if (oldProps.hello) {
            const div = document.createElement('div');
            div.innerHTML = `<div id="on-prop-changed">${oldProps.hello} - ${newProps.hello} - ${propName}</div>`;
            document.body.appendChild(div);
        }
    }

    onDestroyed() {
        const div = document.createElement('div');
        div.innerHTML = '<div id="on-destroyed">Component Destroyed</div>';
        document.body.appendChild(div);
    }

    changeProp() {
        this.props.hello = 'Hello JavaScript';
    }
}
