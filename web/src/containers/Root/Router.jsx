import React, { Component, } from 'react'
import {
    Router,
    hashHistory,
    Route,
    IndexRoute,
} from 'react-router'


//const Buffer = Electron.remote.getGlobal('Buffer');

import App from '../App.jsx'
// import Landing from '../Landing.jsx'
// import Workspace from '../Workspace.jsx'
//
// import { initializeProcessesForDir, } from '../../actions/applicationActions.js'
// import { setTopDir, } from '../../actions/fileActions'
// import { scanLocalRegistries } from '../../actions/moduleActions.js'

import CodeEditor from '../../components/CodeEditor';
import Workspace from '../Workspace';


class AppRouter extends Component {

    componentWillMount() {


        // Fires regardless of whether the pathname differs. Necessary since
        // creating a new project will not change the pathname or fire onEnter
        // if we're already in a new project.
        // this._stopListening = hashHistory.listen((params) => {
        //     const match = params.pathname.match(/\/workspace\/(.*)?/)
        //     if (match && match[1]) {
        //         const hexString = new Buffer(match[1], 'hex')
        //         const path = hexString.toString('utf8')
        //         this.props.store.dispatch(setTopDir(path))
        //         this.props.store.dispatch(scanLocalRegistries(path))
        //         this.props.store.dispatch(initializeProcessesForDir(path))
        //     }
        // })
    }

    componentWillUnmount() {
        //this._stopListening()
    }

    render() {

        return (
            <Router history={hashHistory}>
                <Route
                    path='/'
                    component={App}>
                    <IndexRoute
                        component={Workspace}
                        onEnter={() => {

                        }}/>

                </Route>

            </Router>
        )
    }
}

export default AppRouter
