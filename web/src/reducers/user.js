/**
 * Created by danding on 17/2/5.
 */




const initialState = {
    accessToken: null,
    auth:false,
    personInfo:null
};

let user = (state = initialState, action) => {

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

export default user;
