import React, { Component, } from 'react'
import { DragSource } from 'react-dnd'
const source = {
    beginDrag(props) {
        return {item:props.item}
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging(),
    }
}

const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    display: 'block',
    textAlign: 'center',
    backgroundColor: 'rgba(255,255,255,0.85)',
}



class DraggableListItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            clicked: false,
        }
    }

    handleClick() {
        this.clearTimer()

        this.setState({clicked: true})

        this._timerId = setTimeout(() => {
            this.setState({clicked: false})
        }, 2000)
    }

    clearTimer() {
        if (this._timerId) {
            clearTimeout(this._timerId)
            this._timerId = null
        }
    }

    componentDidMount() {
        const img = new Image()
        img.src = `./images/component-drag-layer.png`
        img.onload = () => this.props.connectDragPreview(img)
    }

    componentWillUnmount() {
        this.clearTimer()
    }


    render() {

        var {clicked}=this.state;
        var  { item , isDragging, connectDragSource } = this.props


        var style = {
            opacity: isDragging ? 0.5 : 1,
            position: 'relative',
        }

        return connectDragSource(
            <div style={style}
                 title={'Drag me into your code!'}
                 onClick={this.handleClick.bind(this)}>
                <li style={{width:'120px'}} className="list-item">{item}</li>

                {
                    clicked && <div style={overlayStyle}>
                        <div>Drag me into your code!</div>
                        <div>Or use <b>cmd+i</b> to insert while typing</div>
                    </div>
                }
            </div>,
            { dropEffect: 'copy' }
        )




    }
}

export default DragSource('COMPONENT', source, collect)(DraggableListItem);

