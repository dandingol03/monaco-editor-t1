
import React, { Component, PropTypes } from 'react'

import ToolbarButton from './ToolbarButton'

class SaveToolbarButton extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ToolbarButton iconClass={this.props.iconClass}
                           text={'Save'}
                           style={this.props.style}
                           onClick={this.props.onClick} />
        )
    }
}

SaveToolbarButton.defaultProps = {
    className: '',
    style: {},
}

SaveToolbarButton.propTypes = {
    iconClass: PropTypes.string.isRequired,
    displayText: PropTypes.object.isRequired,
    style: PropTypes.object,
    onClick: PropTypes.func.isRequired,
}

export default SaveToolbarButton
