

const initialState = {
    accessToken: null,
    auth:false,
    personInfo:null
};

let editor = (state = initialState, action) => {

    switch (action.type) {

        case 'ACCESS_TOKEN_ACK':

            return Object.assign({}, state, {
                accessToken: action.accessToken,
                validate:action.validate,
                auth:action.auth
            })
        case 'GET_PERSON_INFO':
            return Object.assign({}, state, {
                personInfo:action.personInfo
            })

        default:
            return state;
    }
}

export default editor;
