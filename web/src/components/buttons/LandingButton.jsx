
import SimpleButton from './SimpleButton'
import React, { Component } from 'react'

const defaultStyle = {
    display: 'flex',
    justifyContent: 'center',
    color: "#787676",
    backgroundColor: "#ffffff",
    border: '1px solid ' + "rgba(203,203,203,0.52)",
    borderRadius: '5px',
    textDecoration: 'none',
    padding: '0 8px',
    height: '34px',
    fontSize: 14,
    lineHeight: '34px',
    cursor: 'default',
    flex: '0 0 35px',
    fontWeight: '400',
}

const activeStyle = {
    ...defaultStyle,
    backgroundColor: "rgba(0,0,0,0.02)"
}

const hoverStyle = {
    ...defaultStyle,
    backgroundColor: "rgba(0,0,0,0.04)",
}

const innerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}

export default class LandingButton extends Component {
    render() {
        const alignStyle = {
            justifyContent: this.props.align || 'center',
        }

        const styles = {
            active: {...activeStyle,  ...alignStyle},
            hover:  {...hoverStyle,   ...alignStyle},
            def:    {...defaultStyle, ...alignStyle},
        }

        return (
            <SimpleButton {...this.props}
                          defaultStyle={styles.def}
                          activeStyle={styles.active}
                          hoverStyle={styles.hover}
                          innerStyle={innerStyle}
            />
        )
    }
}
