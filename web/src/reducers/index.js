
import { routeReducer, } from 'react-router-redux'
import { combineReducers } from 'redux';

import user from './user';
import monaco from './monacoReducer';

var rootReducer=combineReducers({
    user:user,
    monaco:monaco,
    routing: routeReducer,
});

module.exports=rootReducer;
