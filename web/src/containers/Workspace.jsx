import React, { Component, } from 'react'
import { connect } from 'react-redux'
import CodeEditorDropTarget from '../components/CodeEditorDropTarget';
import DragAndDropMiddleware from '../middleware/editor/DragAndDropMiddleware';
import List from '../components/List';
import _ from 'lodash';
import {
    RIGHT_SIDEBAR_CONTENT,
    LAYOUT_FIELDS,
    LAYOUT_KEY
} from '../constants/LayoutConstants'

import WorkspaceToolbar from './WorkspaceToolbar';

class Workspace extends Component {


     makeDataFromTemplate(templateText,indent)
     {
        var spacing='';
        for(var i=1;i<=indent;i++)
            spacing+=' ';

        var paras=templateText.split('\n');
        var newTemplate='';
        paras.map( (line, i) => {
            if (i == 0) {
                if(line=='')
                    newTemplate+= line+'\n'
                else
                {
                    newTemplate+=spacing+'\n';
                    newTemplate+=spacing+line+'\n'
                }
            }
            else if(i!=(paras.length-1))
                newTemplate+=(spacing + line+'\n')
            else
                newTemplate+=(spacing + line)
        })

        return newTemplate
     }

    calculateIndent(text)
    {
        var reg=/^([\s]*)/;
        var indent=4;
        if(reg.exec(text))
        {
            indent=reg.exec(text)[1].length+4;
        }
        return indent;
    }



    //import component callback
    onImportItem(item) {

        var templateText=item.item;

        var  {_IStandaloneCodeEditor} = this.props;
        var position=_IStandaloneCodeEditor.getPosition();


        //TODO:换行行为缩进探索
        var isModel=_IStandaloneCodeEditor.getModel();
        var lineContent=isModel.getLineContent(position.lineNumber);
        var indent=this.calculateIndent(lineContent);

        var textScaffold =this.makeDataFromTemplate(templateText,indent);
        _IStandaloneCodeEditor.executeEdits('danding', [{
            identifier: 'delete' ,
            range: {startLineNumber:position.lineNumber,startColumn:position.column,endLineNumber:position.lineNumber,endColumn:position.column},
            text: textScaffold,
            forceMoveMarkers: true }]);



        // this.props.dispatch(importComponent(item)).then((payload) => {
        //     alert('callback=========importComponent type='+payload.type);
        //     //always got null
        //     console.log(payload);
        //
        //
        //     var reportStr='description about component item=======  \r\n';
        //     reportStr+='template url=======\r\n'+item.template.text+'\r\n';
        //     reportStr+='dependencies=====\r\n';
        //     if(item.dependency!==undefined&&item.dependency!==null)
        //     {
        //         item.dependencies.map(function(dependency,i){
        //             reportStr+=dependency.toString();
        //         });
        //     }
        //     if(item.template.metadata!==undefined&&item.template.metadata!==null)
        //     {
        //         reportStr+='metadata url=========\r\n';
        //         reportStr+=item.template.metadata;
        //     }
        //
        //     if(item.imports!==undefined&&item.imports!==null)
        //     {
        //         reportStr+='\r\nimports==========\r\n';
        //         reportStr+=item.imports;
        //     }
        //     console.log(reportStr);
        //
        //
        //     //获取模板内容,并引入依赖
        //     fetchTemplateAndImportDependencies(
        //         item.dependencies,
        //         item.template.text,
        //         item.template.metadata,
        //         this.props.rootPath,
        //         this.props.npmRegistry,
        //     ).then(({text, metadata}) => {
        //         const {decoDoc} = this.props
        //
        //         if (! decoDoc) {
        //             return
        //         }
        //         //metadata含有liveValues的json形式
        //         var metadataStr='metadata=============\r\n';
        //         for(var field in metadata)
        //             metadataStr+=field+'=\r\n'+metadata[field];
        //         console.log(metadataStr);
        //
        //         //插入组件template
        //         this.props.dispatch(insertTemplate(
        //             decoDoc,
        //             text,
        //             metadata,
        //             item.imports,
        //             _.get(item, 'inspector.group')
        //         ))
        //     })
        //})
    }


    render() {


        const {
            toolbarHeight,
            toolbarStyle,
            containerStyle,
            leftPaneStyle,
            rightPaneStyle,
            centerPaneStyle,
            leftPaneBottomSectionStyle,
            leftPaneBottomSectionContainerStyle,
            projectNavigatorStyle,
        } = getStyles(this.props)



        return (

            <div className='vbox full-size-relative' style={{overflow:'hidden'}}>

                <WorkspaceToolbar className='toolbar'
                                  height={toolbarHeight}
                                  title={'tmp file'} />


                <div style={Object.assign(styles.container,styles.row)}>
                    <div style={{flex:3,display:'flex',alignItems:'flex-start',flexDirection:'row'}}>

                        <List
                            data={[
                                'danding',
                                'michal jordan',
                                'kobe'
                            ]}
                        />

                    </div>
                    <div style={{flex:7,display:'flex'}}>
                        <CodeEditorDropTarget
                            ref='editor'
                            middleware={[
                                DragAndDropMiddleware(this.props.dispatch),
                            ]}
                            onImportItem={this.onImportItem.bind(this)}
                            _IStandaloneCodeEditor={this.props._IStandaloneCodeEditor}
                        />
                    </div>

                </div>
            </div>

        )
    }
}



function getStyles(props) {
    const {
        leftSidebarBottomSectionHeight,
    } = props
    const toolbarHeight = 71
    const fixedHeightStyle = {
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
    }
    return {
        toolbarHeight: toolbarHeight,
        containerStyle: {
            height: `calc(100% - ${toolbarHeight}px)`,
            overflow: 'hidden',
        },
        leftPaneStyle: _.extend({
            background: 'rgb(252,251,252)',
        }, fixedHeightStyle),
        centerPaneStyle: {
            position: 'absolute',
            left: 0,
            right: 0,
            overflow: 'hidden',
        },
        fixedHeightStyle: fixedHeightStyle,
        rightPaneStyle: _.extend({
            overflowY: 'auto',
            overflowX: 'hidden',
            background: 'rgb(252,251,252)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
        }, fixedHeightStyle),
        leftPaneBottomSectionStyle: {
            position: 'absolute',
            flex: '1 1 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            width: '100%',
            height: '100%',
        },
        leftPaneBottomSectionContainerStyle: {
            borderTop: '1px solid rgb(224,224,224)',
            position: 'absolute',
            bottom: 0,
            height: leftSidebarBottomSectionHeight,
            width: '100%',
        },
        projectNavigatorStyle: {
            position: 'absolute',
            top: 0,
            height: `calc(100% - ${leftSidebarBottomSectionHeight}px)`,
            display: 'flex',
            flexDirection: 'column',
        },
    }
}


const styles={
    container:{
        flex:1,
        display:'flex'
    },
    row:{
        display:'flex',
        flexDirection:'row',
    }
}





const mapStateToProps = (state, ownProps) => {


    const props = {
        _IStandaloneCodeEditor:state.monaco._IStandaloneCodeEditor,
        projectNavigatorVisible: state.ui[LAYOUT_FIELDS.LEFT_SIDEBAR_VISIBLE],
        rightSidebarContent: state.ui[LAYOUT_FIELDS.RIGHT_SIDEBAR_CONTENT],
        rightSidebarWidth: state.ui[LAYOUT_FIELDS.RIGHT_SIDEBAR_WIDTH],
        leftSidebarWidth: state.ui[LAYOUT_FIELDS.LEFT_SIDEBAR_WIDTH],
        leftSidebarBottomSectionHeight: state.ui[LAYOUT_FIELDS.LEFT_SIDEBAR_BOTTOM_SECTION_HEIGHT],
    }

    props.centerPaneWidth = window.innerWidth -
        (props.rightSidebarContent !== RIGHT_SIDEBAR_CONTENT.NONE ? props.rightSidebarWidth : 0) -
        (props.projectNavigatorVisible ? props.leftSidebarWidth : 0)

    return props
}



export default connect(mapStateToProps)(Workspace)
