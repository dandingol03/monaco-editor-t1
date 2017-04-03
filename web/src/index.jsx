import 'babel-polyfill';
//require('../less/main.less');
//require('../../public/main.css');

var React = require('react');
var ReactDOM = require('react-dom');
import { render, } from 'react-dom'
// import { render, } from 'react-dom'

import configureStore from './store/store.dev.js';
import Root from './containers/Root/index'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd';

const store = configureStore();

const DraggableRoot = DragDropContext(HTML5Backend)(Root)

render(
    <DraggableRoot store={store} />,
    document.getElementById('root')
)
//



//ReactDOM.render( <DraggableRoot store={configureStore} />, document.getElementById('root'));
