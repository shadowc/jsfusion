import { Component } from '../../dist/runtime.min';

export default class extends Component {
    setPropTypes() {
        return {
            counter: {
                type: Number,
            },
        };
    }
}
