

import React, { Component, } from 'react'
import Enum from '../../utils/Enum'

const containerStyle = {
    display: 'flex',
    flex: '1 0 auto',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
}

const containerStyleDark = Object.assign({}, containerStyle, {
    backgroundColor: 'rgb(35,36,38)',
})

const style = {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.2)',
    paddingBottom: 20,
    textAlign: 'center',
}

const styleDark = Object.assign({}, style, {
    color: 'rgba(255,255,255,0.15)',
    textShadow: '0 1px 0 rgba(0,0,0,0.2)'
})

const THEME = Enum(
    'LIGHT',
    'DARK',
)

class NoContent extends Component {
    render() {
        const themedStyle = this.props.theme === THEME.LIGHT ?
            style : styleDark
        const themedContainerStyle = this.props.theme === THEME.LIGHT ?
            containerStyle : containerStyleDark

        return (
            <div style={themedContainerStyle}>
                <div style={themedStyle}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

NoContent.defaultProps = {
    theme: THEME.LIGHT,
}

NoContent.THEME = THEME

export default NoContent
