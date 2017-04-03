
import {
    UPDATE_CODE_EDITOR_INSTANCE
} from '../constants/monacoConstants'

export let updateCodeEditorInstance=(payload)=>{
    return {
        type:UPDATE_CODE_EDITOR_INSTANCE,
        payload:payload
    }
}


