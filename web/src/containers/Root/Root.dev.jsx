import React, { Component, PropTypes, } from 'react'
import { Provider, } from 'react-redux'

import Router from './Router.jsx'

import DevTools from '../DevTools.jsx'

class Root extends Component {
    render() {
        const { store, } = this.props
        return (
            <Provider store={store}>
                <div style={{display:'flex',flex:1}}>
                    <Router store={store} />
                </div>
            </Provider>
        )
    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired,
}


module.exports=Root;
