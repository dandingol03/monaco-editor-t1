
import {
    UPDATE_CODE_EDITOR_INSTANCE
} from '../constants/monacoConstants';


const initialState = {
    _IStandaloneCodeEditor: null
};

let monaco = (state = initialState, action) => {

    switch (action.type) {

        case UPDATE_CODE_EDITOR_INSTANCE:
            var {editor}=action.payload;
            return Object.assign({}, state, {
                _IStandaloneCodeEditor: editor,
            })

        default:
            return state;
    }
}

export default monaco;
