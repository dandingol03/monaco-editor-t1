

/**
 * DropTarget(type, spec, collect)(component);
 * type,只有在 type 相同的情况下，DragSource 才能放到 DropTarget 中
 *
 *
 * 1>.spec,让你的组件响应dnd相关事件,支持以下方法:
 * drop(props, monitor, component) 可选，响应 drop 事件
 * hover(props, monitor, component) 可 选
 * canDrop(props, monitor) 可选
 * --props,组件当前的props
 * --monitor,用来查询drag state 的信息
 * --component表示当前组件
 *
 * 2>.collect(connect,monitor),这个函数可以帮助组件的属性注入
 * --connect,connect.dragSource()可以用来封装组件
 * --monitor,用来查询当前拖拽的信息
 *
 *
 */


import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { DropTarget } from 'react-dnd'
import _ from 'lodash'
//import TextUtils from '../../utils/editor/TextUtils'
import CodeEditor from './CodeEditor'

const target = {
    drop(props, monitor, component) {

        //TODO:去除contentWidget
        var  { middleware} = this.props
        _.each(middleware, (m) => {
            if (m.cleanCursorWidget) {
                    m.cleanCursorWidget()
            }
        })


        //TextUtils.ensureNewlineWithIndentation(props.decoDoc.cmDoc)
        //当组件在拖拽时设置了{item:xxx},dropTarget可以通过getItem获取

        props.onImportItem(monitor.getItem())

    },
    hover(props, monitor, component) {
        //get the clinetOffset info
        const {x, y} = monitor.getClientOffset()
        component.setState({
            offset: {
                x: x,
                y: y,
            },
        })
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
    }
}

const style = {
    flexDirection: 'column',
    flex: '1 1 auto',
    alignItems: 'stretch',
    display: 'flex',
}

class CodeEditorDropTarget extends Component {
    constructor(props) {
        super(props)
        this.state = {
            offset: null,
        }
    }
    focus() {
        this.refs.editor.focus()
    }
    render() {
        const {isOver, connectDropTarget, middleware} = this.props
        const {offset} = this.state

        // Enhance any middleware that have a setHover method
        _.each(middleware, (m) => {
            if (m.setHover) {
                m.setHover(isOver, offset)
            }
        })


        return connectDropTarget(
            <div style={style}>
                <CodeEditor ref={'editor'} {...this.props} />
            </div>
        )
    }
}

export default DropTarget('COMPONENT', target, collect)(CodeEditorDropTarget)
