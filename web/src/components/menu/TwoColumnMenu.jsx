

import _ from 'lodash'
import React, { Component, } from 'react'

import LandingButton from '../buttons/LandingButton'

const style = {
    flexDirection: 'row',
    alignItems: 'stretch',
    display: 'flex',
    width: 300,
}

const listStyle = {
    flex: '0 0 50%',
    overflow: 'hidden',
}

const getRowStyle = (options, i) => {
    return {
        marginBottom: i === options.length - 1 ? 0 : 6,
        marginRight: 10,
        marginLeft: 10,
    }
}

const renderList = (options) => {
    return _.map(options, ({text, action}, i) => (
        <div key={i} style={getRowStyle(options, i)}>
            <LandingButton onClick={action}>
                {text}
            </LandingButton>
        </div>
    ))
}

class TwoColumnMenu extends Component {
    render() {
        const {column1 = [], column2 = []} = this.props

        return (
            <div className={'helvetica-smooth'} style={style}>
                <div style={listStyle}>
                    {renderList(column1)}
                </div>
                <div style={listStyle}>
                    {renderList(column2)}
                </div>
            </div>
        )
    }
}
export default TwoColumnMenu
