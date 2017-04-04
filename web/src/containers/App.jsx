
import React, { Component, } from 'react'
import { connect } from 'react-redux'

//import Modal from '../components/modal/Modal.jsx'


class App extends Component {

    render() {

        return (

            <div style={styles.container}>
                {this.props.children}
            </div>

        )
    }
}

var styles={
    container:{
        flex:1,
        display:'flex'
    }
}


export default connect()(App)
