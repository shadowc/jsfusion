import { Component } from '../../dist/runtime.min';

export default class extends Component {
    setPropTypes() {
        return {
            counter: {
                type: Number,
            },
            aString: {
                type: String,
            },
            aBoolean: {
                type: Boolean,
            },
            anArray: {
                type: Array,
            },
            anObject: {
                type: Object,
            }
        };
    }
}
