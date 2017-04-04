
import { routeReducer, } from 'react-router-redux'
import { combineReducers } from 'redux';

import user from './user';
import monaco from './monacoReducer';
import uiReducer from './uiReducer';

var rootReducer=combineReducers({
    user:user,
    monaco:monaco,
    routing: routeReducer,
    ui:uiReducer
});

module.exports=rootReducer;
