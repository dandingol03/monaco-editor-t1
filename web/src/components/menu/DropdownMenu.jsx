
import _ from 'lodash'
import React, { Component } from 'react'

import Menu from './Menu'

class DropdownMenu extends Component {
    render() {
        let style = {
            background: 'rgb(252,251,252)',
            borderRadius: '3px',
            boxShadow: '0 2px 8px 1px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)',
            padding: '10px 0',
        }
        style = _.extend(style, _.cloneDeep(this.props.style))
        return (
            <Menu {...this.props} style={style}/>
        )
    }
}

DropdownMenu.defaultProps = {
    className: '',
    style: {},
}

export default DropdownMenu
