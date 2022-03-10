import { Component } from '../../dist/runtime.min';

export default class extends Component {
    setPropTypes() {
        return {
            counter: {
                type: Number,
                defaultValue: 5,
            },
            aString: {
                type: String,
                defaultValue: 'hello',
            },
        };
    }
}
