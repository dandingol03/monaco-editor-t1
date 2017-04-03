
import React, { Component, } from 'react'
import { connect } from 'react-redux'
import CodeEditorDropTarget from '../components/CodeEditorDropTarget';
import DragAndDropMiddleware from '../middleware/editor/DragAndDropMiddleware';
import List from '../components/List';
class Workspace extends Component {


    //import component callback
    onImportItem(item) {

        
        const {options} = this.props
        this.props.dispatch(importComponent(item)).then((payload) => {
            alert('callback=========importComponent type='+payload.type);
            //always got null
            console.log(payload);


            var reportStr='description about component item=======  \r\n';
            reportStr+='template url=======\r\n'+item.template.text+'\r\n';
            reportStr+='dependencies=====\r\n';
            if(item.dependency!==undefined&&item.dependency!==null)
            {
                item.dependencies.map(function(dependency,i){
                    reportStr+=dependency.toString();
                });
            }
            if(item.template.metadata!==undefined&&item.template.metadata!==null)
            {
                reportStr+='metadata url=========\r\n';
                reportStr+=item.template.metadata;
            }

            if(item.imports!==undefined&&item.imports!==null)
            {
                reportStr+='\r\nimports==========\r\n';
                reportStr+=item.imports;
            }
            console.log(reportStr);


            //获取模板内容,并引入依赖
            fetchTemplateAndImportDependencies(
                item.dependencies,
                item.template.text,
                item.template.metadata,
                this.props.rootPath,
                this.props.npmRegistry,
            ).then(({text, metadata}) => {
                const {decoDoc} = this.props

                if (! decoDoc) {
                    return
                }
                //metadata含有liveValues的json形式
                var metadataStr='metadata=============\r\n';
                for(var field in metadata)
                    metadataStr+=field+'=\r\n'+metadata[field];
                console.log(metadataStr);

                //插入组件template
                this.props.dispatch(insertTemplate(
                    decoDoc,
                    text,
                    metadata,
                    item.imports,
                    _.get(item, 'inspector.group')
                ))
            })
        })
    }


    render() {

        return (

            <div style={{width:'100%',height:'100%'}}>
                <div style={{width:'30%',height:'100%',float:'left'}}>

                    <List
                       data={[
                           'danding',
                           'michal jordan',
                           'kobe'
                       ]}
                    />

                </div>
                <div style={{width:'70%',height:'100%',float:'left'}}>
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

        )
    }
}


const mapStateToProps = (state) => {

    return {
        _IStandaloneCodeEditor:state.monaco._IStandaloneCodeEditor
    }
}

export default connect(mapStateToProps)(Workspace)
