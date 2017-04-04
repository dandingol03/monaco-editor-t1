/**
 * Created by danding on 17/4/4.
 */


import _ from 'lodash'

import request from '../ipc/Request'
import FileConstants from '../../../shared/constants/ipc/FileConstants'

const {
    GET_JSON_DATA,
    UPDATE_JSON_FILE,
    CREATE_DIRECTORY,
    CREATE_FILE
} = FileConstants

import {
    createDirectory,
    addSubPath,
    clearSelections,
    selectFile,
    setCollapseOnNode
} from '../actions/fileActions'


import {
    openProject
} from '../actions/applicationActions'

import {
    addTab,
    swapTab,
    closeTab,
    makeTabPermanent,
} from '../actions/tabActions'



//import { openDocument, docIdChange } from '../actions/editorActions'

import { CONTENT_PANES } from '../constants/LayoutConstants'

import FetchUtils from '../utils/FetchUtils'

/**
 * 向目标iframe发送事件,切换到'组件自定义'界面
 */
export const sendCustomizeNavigate=()=>{
    var faker=document.getElementById('fake-render');
    var iframe=faker.children[0];
    var obj=iframe.contentDocument.getElementById("root");
    var event=document.createEvent('CustomEvent');
    event.initCustomEvent('customizeNavigate',false,true,{});
    obj.dispatchEvent(event);

}



function _createDirectory(id, dirname) {
    return {
        type: CREATE_DIRECTORY,
        id,
        dirname,
    }
}

function _createFile(id, filename, data) {
    return {
        type: CREATE_FILE,
        id,
        filename,
        data,
    }
}

export const EXEC_SHELL='EXEC_SHELL';
function _execShell(path){
    return {
        type:EXEC_SHELL,
        path:path
    }
}



//下载npm_login.sh,并进行npm登录
export const loginNpmShell=(payload)=>{
    return (dispatch,getState)=>{

        return new Promise((resolve, reject) => {

            const state=getState();
            var {path,dirname,username,password,email}=payload;
            var preDir=path;
            var newDir=preDir+'/'+dirname;
            var buf=new Buffer(newDir);
            var dirId=buf.toString('hex');
            var loginShell=null;
            FetchUtils.fetchResource('http://139.129.96.231:3000/fetchNpmLoginShell').then((data)=>{
                return data.text();
            }).then((shell)=>{
                loginShell=shell;
                var  compiled = _.template(loginShell);
                var se=compiled({username:'\"'+username+'\\r\"',password:'\"'+password+'\\r\"',email:'\"'+email+'\\r\"'},{escape:['<']});//此处se已为文本
                return  request(_createFile(dirId, 'npm_login.sh',se));
            }).then((payload)=>{
                //TODO:在node环境中执行shell文本
                return request(_execShell(path+'/'+dirname+'/npm_login.sh'));
            }).then((payload)=>{
                resolve(payload)
            }).catch((e)=>{
                reject(e);
            })
        });

    }
}

//在tmp路径底下初始化npm库
export const initNpmShell=(payload)=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {

            const state = getState();
            var {path,dirname,proj,description,keywords,author}=payload;
            var preDir=path;
            var newDir=preDir+'/'+dirname;
            var buf=new Buffer(newDir);
            var dirId=buf.toString('hex');
            var initShell=null;
            //firstly,make a inquire to gain the username and password from npm
            FetchUtils.fetchResource('http://139.129.96.231:3000/fetchNpmInitShell').then((data)=>{
                return data.text();
            }).then((shell)=>{
                initShell=shell;
                var  compiled = _.template(initShell);
                var se=compiled({proj:'\"'+proj+'\\r\"',main:'\"'+main+'\\r\"',description:'\"'+description+'\\r\"',
                    keywords:'\"'+keywords+'\\r\"',author:'\"'+author+'\\r\"'},{escape:['<']});//此处se已为文本
                return  request(_createFile(dirId, 'npm_init.sh',se));
            }).then((payload)=>{
                return request(_execShell(path+'/'+dirname+'/npm_init.sh'));

            }).then((payload)=>{
                resolve(payload)
            }).catch((e)=>{
                reject(e);
            })

        });
    }
}

//项目上传
export const uploadNpmProjWithParsed=(payload)=>{
    return (dispatch,getState)=>{
        return new Promise((resolve,reject)=>{

            const state = getState();
            var {path,dirname}=payload;
            var preDir=path;
            var newDir=preDir+'/'+dirname;
            var buf=new Buffer(newDir);
            var dirId=buf.toString('hex');
            var parsedShell=null;

            FetchUtils.fetchResource('http://139.129.96.231:3000/fetchBabelParserShell').then((data)=>{
                return data.text();
            }).then((shell)=>{
                var  compiled = _.template(shell);
                var se=compiled({proj:'\"'+proj+'\\r\"',main:'\"'+main+'\\r\"',description:'\"'+description+'\\r\"'},{escape:['<']});//此处se已为文本

                return  request(_createFile(dirId, 'parser.sh',se));
            }).then((payload)=>{
                return request(_execShell(path+'/'+dirname+'/parser.sh'));
            }).catch((e)=>{
                reject(e);
            });

        });

    }
}


export const INIT_CUSTOMIZE_WORKSPACE='INIT_CUSTOMIZE_WORKSPACE';
export const initCustomizeWorkspace=(path,dirname)=>{
    return (dispatch, getState) => {
        const state = getState();
        var preDir=path;
        var buf= new Buffer(preDir);
        var id = buf.toString('hex');

        request(_createDirectory(id,dirname)).then((payload)=>{
            console.log('tmp dir create completely');
            var newDir=preDir+'/'+dirname;
            var buf= new Buffer(newDir);
            var dirId = buf.toString('hex');


            //data是模板化的文件内容,考虑如何进行拉取
            FetchUtils.fetchResource('http://139.129.96.231:3000/fetchRNTemplate').then((result) => {
                return result.text();
            }).then((template)=>{
                console.log(template);
                return   request(_createFile(dirId, 'index.jsx',template));
            }).then((payload)=>{


                const fileInfo = addSubPath(payload).fileInfo
                dispatch(addSubPath(payload))
                dispatch(openDocument(fileInfo))
                dispatch(addTab(CONTENT_PANES.CENTER, fileInfo.id))
                dispatch(clearSelections())
                dispatch(selectFile(fileInfo.id))
                //TODO:figure out how to set nod ecollapse
                dispatch(setCollapseOnNode({id:dirId}, false))
            });



        });

    }
}

export const ADD_CUSTOMIZE_PROPERTIES = 'ADD_CUSTOMIZE_PROPERTIES'
export const addCustomizeProperties = (id,path,utf8Data) => {
    return {
        type: ADD_CUSTOMIZE_PROPERTIES,
        payload:{
            id:id,
            path: path,
            utf8Data:utf8Data
        }
    }
}

export const SET_CUSTOMIZE_PROPERTIES='SET_CUSTOMIZE_PROPERTIES';
export const setCustomizeProperties = (path) => {
    return {
        type: SET_CUSTOMIZE_PROPERTIES,
        path: path
    }
}





function _getJSONData(path) {
    return {
        type: GET_JSON_DATA,
        path:path,
    }
}

//获取preview中的properties.json数据,fileInfo.path为完整的路径字符串
export function fetchCustomizeProperties(absolutePath){
    return (dispatch, getState) => {
        const state = getState()
        if (state.customize.paths&&state.customize.paths[absolutePath]!==undefined&&state.customize.paths[absolutePath]!==null)
        {
            dispatch(setCustomizeProperties(absolutePath));
        } else {

            //fileInfo.absolutePath is <Array>
            request(_getJSONData(absolutePath)).then((payload) => {
                //payload:{type: GET_JSON_DATA,id:xxx,absolutePath:xxx,utf8Data: xxx}
                dispatch(addCustomizeProperties(payload.id,absolutePath,payload.utf8Data));
            })
        }
    }
}


//TODO:make behavious below with uiActions
export const CUSTOMIZING_PANEL_OPEN='CUSTOMIZING_PANEL_OPEN';
export const openCustomizingPanel=()=>{
    return {
        type:CUSTOMIZING_PANEL_OPEN,
        payload:{

        }
    }
}

export const CUSTOMIZING_PANEL_TOGGLE='CUSTOMIZING_PANEL_TOGGLE';
export const toggleCustomizingPanel=()=>{
    return {
        type:CUSTOMIZING_PANEL_TOGGLE,
        payload:null
    }
}


function _updateJsonFile(data,path) {
    return {
        type: UPDATE_JSON_FILE,
        data:data,
        path:path
    }
}

//用户删除结点
export const PROPERTY_DELETE='PROPERTY_DELETE';
export const deleteProperty=(node)=>{

    return (dispatch, getState) => {
        const state = getState();
        const {prefix}=node;

        var path=state.customize.path;
        if(path!==undefined&&path!==null&&path!='')
        {
            var property=JSON.parse(state.customize.property.toString());
            var command='property';

            prefix.map(function(pre,i){
                command+='[\''+pre+'\']';
            });

            command='delete '+command;
            eval(command);
            var buf= new Buffer(JSON.stringify(property), 'utf8');
            //TODO:get the destination file path

            request(_updateJsonFile(buf,path)).then((payload) => {
                dispatch({
                    type:PROPERTY_UPDATE,
                    payload:{
                        path:path,
                        buf:buf
                    }
                });
            });
        }else{
            return ;
        }
    }
}


//当用户更改已有结点值或者增加结点
export const PROPERTY_UPDATE='PROPERTY_UPDATE';
export const updateProperty=(node)=>{

    return (dispatch, getState) => {
        const state = getState();
        const {prefix,value}=node;

        var path=state.customize.path;
        if(path!==undefined&&path!==null&&path!='')
        {
            var property=JSON.parse(state.customize.property.toString());
            var command='property';

            prefix.map(function(pre,i){
                command+='[\''+pre+'\']';
            });
            if(!isNaN(parseInt(value)))
            {
                command+='='+value;
            }
            else if(Object.prototype.toString.call(value)=='[object String]')
                command+='='+'\''+value+'\'';
            else{
                command+='='+value;
            }
            eval(command);
            var buf= new Buffer(JSON.stringify(property), 'utf8');
            //TODO:get the destination file path

            request(_updateJsonFile(buf,path)).then((payload) => {
                dispatch({
                    type:PROPERTY_UPDATE,
                    payload:{
                        path:path,
                        buf:buf
                    }
                });
            });
        }else{
            return ;
        }
    }
}

//用户改变结点类型
export const changePropertyType=(node)=>{
    return (dispatch, getState) => {
        const state = getState();
        const {prefix,type}=node;

        var path=state.customize.path;
        if(path!==undefined&&path!==null&&path!='')
        {
            var property=JSON.parse(state.customize.property.toString());
            var command='property';

            prefix.map(function(pre,i){
                command+='[\''+pre+'\']';
            });

            if(type=='object')
            {
                command+='='+'{}';
            }else if(type=='array')
            {
                command+='='+'[]';
            }else{}


            eval(command);
            var buf= new Buffer(JSON.stringify(property), 'utf8');
            //TODO:get the destination file path

            request(_updateJsonFile(buf,path)).then((payload) => {
                dispatch({
                    type:PROPERTY_UPDATE,
                    payload:{
                        path:path,
                        buf:buf
                    }
                });
            });
        }else{
            return ;
        }
    }
}


