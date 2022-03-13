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
}
