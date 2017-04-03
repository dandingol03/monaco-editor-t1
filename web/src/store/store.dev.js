
import { createStore, applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers/index.js';
import DevTools from '../containers/DevTools.jsx'
import { hashHistory } from 'react-router'
import { syncHistory } from 'react-router-redux'
//import applyActionEmitters from './applyActionEmitters.js'
//import ipcActionEmitter from '../ipc/ipcActionEmitter.js'
//import preferencesActionEmitter from '../persistence/preferencesActionEmitter.js'
//import moduleActionEmitter from '../persistence/moduleActionEmitter.js'


const middlewares = [thunk];
const createLogger = require('redux-logger');
const reduxRouterMiddleware = syncHistory(hashHistory)
const enhancer = compose(
    applyMiddleware(thunk, reduxRouterMiddleware),
    DevTools.instrument()
)

if (process.env.NODE_ENV === 'development') {
    const logger = createLogger();
    middlewares.push(logger);
}
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);



export default function configureStore() {
    const store = createStore(reducers, enhancer)
    // applyActionEmitters(store)(
    //     ipcActionEmitter,
    //     preferencesActionEmitter,
    //     moduleActionEmitter
    // )
    reduxRouterMiddleware.listenForReplays(store);
    return store
}




