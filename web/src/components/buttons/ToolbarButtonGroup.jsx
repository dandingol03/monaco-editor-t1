
import React, { Component, PropTypes } from 'react'

import ToolbarButton from './ToolbarButton'

class ToolbarButtonGroup extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const childCount = React.Children.count(this.props.children)

        const clonedChildren = React.Children.map(this.props.children, (child, i) => {
            const isActive = this.props.activeIndexes[i] === true

            let groupPosition
            if (childCount === 1) {
                groupPosition = ToolbarButton.GROUP_POSITION.NONE
            } else {
                switch (i) {
                    case 0:
                        groupPosition = ToolbarButton.GROUP_POSITION.LEFT
                        break
                    case childCount - 1:
                        groupPosition = ToolbarButton.GROUP_POSITION.RIGHT
                        break
                    default:
                        groupPosition = ToolbarButton.GROUP_POSITION.CENTER
                        break
                }
            }

            return React.cloneElement(child, {
                buttonState: isActive ? ToolbarButton.BUTTON_STATE.ACTIVE :
                    ToolbarButton.BUTTON_STATE.DEFAULT,
                groupPosition: groupPosition,
                theme: this.props.theme,
            })
        })

        const style = Object.assign({}, {
            display: 'flex',
            flexDirection: 'row',
        }, this.props.style)

        return (
            <div style={style}>
                {clonedChildren}
            </div>
        )
    }
}

ToolbarButtonGroup.THEME = ToolbarButton.THEME

ToolbarButtonGroup.propTypes = {
    activeIndexes: PropTypes.array,
    theme: PropTypes.number,
}

ToolbarButtonGroup.defaultProps = {
    activeIndexes: [],
    theme: ToolbarButtonGroup.THEME.LIGHT,
}

export default ToolbarButtonGroup
