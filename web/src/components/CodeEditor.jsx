import React from 'react';
import { render } from 'react-dom';
import MonacoEditor from 'react-monaco-editor';
import _ from 'lodash'
import { connect } from 'react-redux'
import {
    updateCodeEditorInstance
} from '../action/monacoActions';

class CodeEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '// type your code... \nconsole.log(\'hi danding\');',
        }
    }

    attachMiddleware(middleware, _IStandaloneCodeEditor) {
        _.invokeMap(middleware, 'attach', _IStandaloneCodeEditor)
    }

    editorDidMount(editor) {
        console.log('editorDidMount', editor, editor.getValue(), editor.getModel());
        this.editor = editor;
        var props=this.props;
        this.props.dispatch(updateCodeEditorInstance({editor:editor}))
        this.attachMiddleware(props.middleware, editor)
    }
    onChange(newValue, e) {
        console.log('onChange', newValue, e);
    }
    changeEditorValue() {
        if (this.editor) {
            this.editor.setValue('// code changed! \n');
        }
    }
    changeBySetState() {
        this.setState({code: '// code changed by setState! \n'});
    }
    render() {
        const code = this.state.code;
        const options = {
            selectOnLineNumbers: true,
            roundedSelection: false,
            readOnly: false,
            theme: 'vs',
            cursorStyle: 'line',
            automaticLayout: false,
        };
        return (
            <div>
                <div>
                    <button onClick={this.changeEditorValue}>Change value</button>
                    <button onClick={this.changeBySetState}>Change by setState</button>
                </div>
                <hr />
                <MonacoEditor
                    height="500"
                    language="javascript"
                    value={code}
                    options={options}
                    onChange={this.onChange}
                    editorDidMount={(editor)=>{
                        this.editorDidMount(editor)
                    }}
                />
            </div>
        );
    }
}



export default connect()(CodeEditor)


