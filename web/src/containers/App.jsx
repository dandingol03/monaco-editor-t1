
import React, { Component, } from 'react'
import { connect } from 'react-redux'

//import Modal from '../components/modal/Modal.jsx'


class App extends Component {

    render() {

        return (

            <div style={{width:'100%',height:'100%'}}>
                {this.props.children}
            </div>

        )
    }
}


export default connect()(App)
