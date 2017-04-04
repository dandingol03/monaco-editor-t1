
import _ from 'lodash'

import request from '../ipc/Request'

import FetchUtils from '../utils/FetchUtils'

export const NPM_LOGGED='NPM_LOGGED';
export const onNpmLogged=(payload)=>{
    return {
        type: NPM_LOGGED,
        username:payload.username,
        password:payload.password
    }
}

export const MAKE_LOGIN_VISIBLE='MAKE_LOGIN_VISIBLE';
export const makeLoginVisible=()=>{
    return {
        type:MAKE_LOGIN_VISIBLE
    }
}

export const MAKE_LOGIN_UNVISIBLE='MAKE_LOGIN_UNVISIBLE';
export const makeLoginUnVisible=()=>{
    return {
        type:MAKE_LOGIN_UNVISIBLE
    }
}

export const MAKE_INIT_VISIBLE='MAKE_INIT_VISIBLE';
export const makeInitVisible=()=>{
    return {
        type:MAKE_INIT_VISIBLE
    }
}

export const MAKE_INIT_UNVISIBLE='MAKE_INIT_UNVISIBLE';
export const makeInitUnVisible=()=>{
    return {
        type:MAKE_INIT_UNVISIBLE
    }
}
