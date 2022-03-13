import { Component } from '../../dist/runtime.min';

export default class extends Component {
    setPropTypes() {
        return {
            counter: {
                type: Number,
                defaultValue: 0,
            },
        };
    }

    /**
     * @param {MouseEvent} event
     */
    handleClick(event) {
        this.props.counter++;
    }

    /**
     * @param {MouseEvent} event
     */
    dummyEventHandler(event) {
        // NOOP
    }

    emitCustomEvent() {
        this.emit('customEvent', { legend: 'my custom event' });
    }

    emitCustomEventFromButton() {
        this.emit('customEvent', { legend: 'my custom event' }, this.element.querySelector('button'));
    }

    handleCustomEvent(event) {
        const div = document.createElement('div');
        div.innerHTML = `<div id="addedElement">${event.detail.legend}</div>`;
        document.body.appendChild(div);
    }
}
