

import _ from 'lodash'

import request from '../ipc/Request'
import FileConstants from 'shared/constants/ipc/FileConstants'
const {
    GET_FILE_DATA,
} = FileConstants

import DecoChangeFactory from '../factories/editor/DecoChangeFactory'
import DecoRange from '../models/editor/DecoRange'
import DecoChangeTransformer from '../utils/editor/DecoChangeTransformer'
import DecoRangeUtils from '../utils/editor/DecoRangeUtils'
import DecoComponentUtils from '../utils/editor/DecoComponentUtils'
import LiveValueUtils from '../utils/metadata/LiveValueUtils'
import LiveValueGroupUtils from '../utils/metadata/LiveValueGroupUtils'
import uuid from '../utils/uuid'
import { markSaved , addHiddenFileId } from './fileActions'
import { createHistory, addToHistory, undoFromHistory, redoToHistory } from './historyActions'
import { setLiveValueIds, createLiveValue, setLiveValues, importLiveValues } from './liveValueActions'
import { loadMetadata } from './metadataActions'
import { save, saveLive } from './applicationActions'
import { CATEGORIES, PREFERENCES } from 'shared/constants/PreferencesConstants'
import {openFile} from './compositeFileActions'

import CodeMirror from 'codemirror'

const findImportRange= (importName, cmDoc,type) => {
    let amInImportBlock = false
    let amInBlock = false
    let fromLine = -1
    let toLine = -1
    let belowed=false;
    const lineCount = cmDoc.lineCount()
    const importNameRE = new RegExp(`['"]${importName}['"]`)

    for (var i = 0; (i < lineCount && toLine === -1); i++) {
        const lineValue = cmDoc.getLine(i)
        if (lineValue.match('import ')) {
            if (lineValue.match('{')) {
                amInImportBlock = true
                fromLine = i
            } else if (lineValue.match('from') && lineValue.match(importNameRE)) {
                fromLine = i
                toLine = i
                break
            } else if (type=='interface' && lineValue.match(importName))
            {
                fromLine=i
                if( lineValue.match('from'))
                    toLine=i
            }
        }
        if (lineValue.match('} from ')) {
            if (amInImportBlock) {
                if (lineValue.match(importNameRE)) {
                    toLine = i
                }else if(type=='interface'&&belowed==true)
                {
                    toLine = i
                }
                amInImportBlock = false
            }
        }
        if (lineValue.match('{')) {
            amInBlock = true
            if (!amInImportBlock) {
                fromLine = i
            }
        }
        if (lineValue.match('require')) {
            if (amInBlock && lineValue.match(importNameRE)) {
                toLine = i
            }
        }
        if (lineValue.match('}')) {
            if (amInBlock) {
                amInBlock = false
            }
        }
        if (lineValue.match(importNameRE)||(type=='interface'&&lineValue.match(importName)))
            belowed=true;
    }
    //the top module doesnt exist so well create it fresh
    let parentModuleDoesNotExist = false
    if (toLine < 0) {
        parentModuleDoesNotExist = true
        fromLine = 0 //put require at the top
    }

    return {
        foundParent: !parentModuleDoesNotExist,
        fromLine,
        toLine,
    }
}



export const MODULE_NAVIGATE='MODULE_NAVIGATE';
const navigateModule=(payload) => {
    return {
        type: MODULE_NAVIGATE,
        moduleName: payload.moduleName,
        rootName:payload.rootName,
        absolutePath:payload.absolutePath
    }
}

//根据模块名进行文件跳转
export const navigatModule=(payload)=>{
    return (dispatch, getState) => {


        try{
            var reactKeywords=CodeMirror.reactKeywords;
            CodeMirror.reactKeywords=reactKeywords.concat('danding-jj');
            var state=getState();
            var directory=state.directory;
            var rootName=directory.rootPath;
            var selected=directory.selected;


            var selectedId=null;
            for(var field in selected)
            {
                if(selected[field]==true)
                    selectedId=field;
            }
            var fileInfo=directory.filesById[selectedId];


            var {token,cm}=payload;
            var type='interface';
            if(token.string.toString().indexOf('\'')!=-1||token.string.toString().indexOf('\"')!=-1)
                type='module';
            var {fromLine,toLine}=findImportRange(token.string.toString().replace(/\'|\"/g,''),cm.doc,type);
            var tokens=cm.getLineTokens(toLine);
            var moduleName=null;
            if(tokens[tokens.length-1].string.indexOf(';')!=-1)
                moduleName=tokens[tokens.length-2].string.replace(/\'|\"/g,'');
            else
                moduleName=tokens[tokens.length-1].string.replace(/\'|\"/g,'');
            console.log('module clicked='+moduleName);

            //TODO:locate node_modules first


            request(navigateModule({rootName:rootName,moduleName:moduleName,absolutePath:fileInfo.absolutePath})).then((payload) => {
                var {path,absolutePathArray}=payload;
                if(path!==null&&path!==undefined)
                {

                    var buffer = new Buffer(path);
                    var id = buffer.toString('hex');
                    //TODO:update filesById fileInfo
                    var filename=null;
                    if(absolutePathArray[absolutePathArray.length-1]!=''||absolutePathArray[absolutePathArray.length-1]!="")
                        filename=absolutePathArray[absolutePathArray.length-1];
                    else
                        filename=absolutePathArray[absolutePathArray.length-2];
                    var fileInfo={
                        absolutePath:absolutePathArray,
                        id:id,
                        fileType:'file',
                        isLeaf:true,
                        module:filename
                    };
                    dispatch(addHiddenFileId(fileInfo))
                    dispatch(openFile(fileInfo));
                }
            });

        }catch(e)
        {
            console.error(e);
        }

    }
}



export const CLEAR_EDITOR_STATE = 'CLEAR_EDITOR_STATE'
export const clearEditorState = () => {
    return {
        type: CLEAR_EDITOR_STATE,
    }
}

export const SET_CURRENT_DOC = 'SET_CURRENT_DOC'
export const setCurrentDoc = (id) => {
    return {
        type: SET_CURRENT_DOC,
        id: id,
    }
}
export const clearCurrentDoc = () => {
    return {
        type: SET_CURRENT_DOC,
        id: null,
    }
}

export const CACHE_DOC = 'CACHE_DOC'
export const _cacheDoc = (payload, decoRanges) => {
    return {
        type: CACHE_DOC,
        id: payload.id,
        data: payload.utf8Data,
        decoRanges,
    }
}

//TODO switch onFileData to request format so we can move the action / dispatch chaining up to containers.
//TODO these kinds of functions could possibly be removed into a separate action file
//docCache is a key-map struct,which store the id of file
export function cacheDoc(payload) {
    return (dispatch, getState) => {
        const cache = getState().editor.docCache;

        const dirtyList = getState().editor.dirtyList

        //payload.utf8Data is the content from the file which you open


        //如果已经有了cache中已经有了该文件
        if (_.has(cache, payload.id)) {
            const decoDoc = cache[payload.id]

            // TODO clear metadata and ranges, then re-add?
            if (decoDoc.decoRanges.length > 0) {
                return
            }

            // if this data is new,when we change the content of the file
            if (decoDoc.code !== payload.utf8Data) {
                // if the document hasn't been edited since last save

                if (!_.has(dirtyList, payload.id)) {
                    // overwrite
                    decoDoc.code = payload.utf8Data
                    dispatch(markClean(payload.id))
                    dispatch(markSaved(payload.id))
                }
            }
            //nothing in the cache, we create the doc
        } else {
            //payload.id equals to the hex encoded of the absolutePath of file


            dispatch(loadMetadata(payload.id)).then((metadata) => {
                //加载完元数据后
                const {decoRanges, liveValueIds, liveValuesById} = metadata.liveValues
                dispatch(setLiveValues(payload.id, liveValueIds, liveValuesById))
                dispatch(_cacheDoc(payload, decoRanges))
                dispatch(createHistory(payload.id))
            }).catch((err) => {

                //TODO:get what makes err happen
                if (err.code === 'ENOENT') {
                    dispatch(_cacheDoc(payload, []))
                    dispatch(createHistory(payload.id))
                } else {
                    console.error(`Error reading metadata for ${payload.id}`)
                }
            })
        }
    }
}


//TODO actually use change generation correctly
export const MARK_DIRTY = 'MARK_DIRTY'
export const markDirty = (id) => {
    return {
        type: MARK_DIRTY,
        id: id,
    }
}

export const MARK_CLEAN = 'MARK_CLEAN'
export const markClean = (id) => {
    return {
        type: MARK_CLEAN,
        id: id,
    }
}

const getCachedDecoDoc = (cache, id) => {
    const decoDoc = cache[id]
    if (! decoDoc) {
        throw new Error("Failed to operate on decoDoc, decoDoc wasn't in cache!")
    }
    return decoDoc
}

let _saveLiveDebounced = null
let _debounceDelay = null
const saveLiveDebounced = (dispatch, delay) => {
    if (delay !== _debounceDelay) {
        _debounceDelay = delay
        _saveLiveDebounced = _.debounce(() => {
            dispatch(saveLive())
        }, delay)
    }

    _saveLiveDebounced()
}

const conditionalSaveLive = (dispatch, savingPreferences) => {
    if (savingPreferences[PREFERENCES.SAVING.AUTOSAVE] &&
        savingPreferences[PREFERENCES.SAVING.TEXT_EDIT]) {
        const delay = savingPreferences[PREFERENCES.SAVING.DEBOUNCE]
        saveLiveDebounced(dispatch, delay)
    }
}

function setLiveValuesForDoc(fileId, decoDoc) {
    const liveValueIds = _.map(decoDoc.decoRanges, 'id')
    return setLiveValueIds(fileId, liveValueIds)
}

export const OPERATION_EDIT = 'OPERATION_EDIT'

//在此方法中发生文本变动,此时的decoChange为compositeChange
export function edit(id, decoChange) {
    return (dispatch, getState) => {
        const state = getState()
        const decoDoc = getCachedDecoDoc(state.editor.docCache, id)

        const transformedChange = DecoChangeTransformer.transformDecoChange(
            decoChange,
            decoDoc.decoRanges
        )

        // Get the code for all ranges, pre-edit
        const initialCodeForRanges = decoDoc.getCodeForDecoRanges()

        decoDoc.edit(transformedChange)

        // Get the code for all ranges, post-edit, and see if types differ
        const updatedCodeForRanges = decoDoc.getCodeForDecoRanges()
        const rangesWithModifiedTokenTypes = DecoRangeUtils.findRangesWithModifiedTokenTypes(
            initialCodeForRanges,
            decoDoc.decoRanges,
            updatedCodeForRanges
        )

        // If types of ranges differ after the edit
        if (rangesWithModifiedTokenTypes.length > 0) {

            // Remove these ranges
            const removeBrokenRanges = DecoChangeFactory.createChangeToRemoveDecoRanges(
                rangesWithModifiedTokenTypes
            )

            decoDoc.edit(removeBrokenRanges)

            // Combine both the text change and the range removal into one change
            const combinedChange = DecoChangeFactory.createCompositeChange([
                transformedChange,
                removeBrokenRanges,
            ])

            dispatch(addToHistory(id, combinedChange))
        } else {
            dispatch(addToHistory(id, transformedChange))
        }

        dispatch(setLiveValuesForDoc(id, decoDoc))
        conditionalSaveLive(dispatch, state.preferences[CATEGORIES.SAVING])
    }
}
export const OPERATION_UNDO = 'OPERATION_UNDO'
export function undo(id) {
    return (dispatch, getState) => {
        const state = getState()
        const history = state.history[id]

        if (history.canUndo()) {
            const decoChange = history.getUndoStackTop()
            const invertedChange = decoChange.invert()
            const decoDoc = getCachedDecoDoc(state.editor.docCache, id)

            decoDoc.edit(invertedChange)

            dispatch(undoFromHistory(id))
            dispatch(setLiveValuesForDoc(id, decoDoc))
            conditionalSaveLive(dispatch, state.preferences[CATEGORIES.SAVING])
        }
    }
}

export const OPERATION_REDO = 'OPERATION_REDO'
export function redo(id) {
    return (dispatch, getState) => {
        const state = getState()
        const history = state.history[id]

        if (history.canRedo()) {
            const decoChange = history.getRedoStackTop()
            const decoDoc = getCachedDecoDoc(state.editor.docCache, id)

            decoDoc.edit(decoChange)

            dispatch(redoToHistory(id))
            dispatch(setLiveValuesForDoc(id, decoDoc))
            conditionalSaveLive(dispatch, state.preferences[CATEGORIES.SAVING])
        }
    }
}

export const HIGHLIGHT_LITERAL_TOKENS = 'HIGHLIGHT_LITERAL_TOKENS'
export const enableTokenHighlighting = () => {
    return {
        type: HIGHLIGHT_LITERAL_TOKENS,
        payload: true,
    }
}
export const disableTokenHighlighting = () => {
    return {
        type: HIGHLIGHT_LITERAL_TOKENS,
        payload: false,
    }
}

export const SET_TEXT_FOR_RANGE = 'SET_TEXT_FOR_RANGE'
export const setTextForDecoRange = (fileId, decoRangeId, text) => {
    return (dispatch, getState) => {
        const state = getState()
        const cache = state.editor.docCache
        const decoDoc = getCachedDecoDoc(cache, fileId)

        const decoRange = decoDoc.getDecoRange(decoRangeId).withoutWhitespace()
        const originalCode = decoDoc.getCodeForDecoRange(decoRangeId)

        const decoChange = DecoChangeFactory.createChangeToSetText(
            decoRange.from,
            decoRange.to,
            text,
            originalCode
        )

        dispatch(edit(fileId, decoChange))

        if (state.preferences[CATEGORIES.SAVING][PREFERENCES.SAVING.AUTOSAVE] &&
            state.preferences[CATEGORIES.SAVING][PREFERENCES.SAVING.PROPERTY_CHANGE]) {
            dispatch(saveLive())
        }
    }
}

const _getComponentMetadata = (componentInfo, state) => {
    if (!componentInfo.module) {
        return state.metadata.components.localComponents[componentInfo.name]
    } else {
        return state.metadata.components.coreComponents[componentInfo.name]
    }
}

export const insertComponent = (componentInfo, decoDoc) => {
    return (dispatch, getState) => {
        const metadata = _getComponentMetadata(componentInfo, getState())
        const {decoRanges, liveValuesById} = LiveValueUtils.normalizeLiveValueMetadata(metadata.liveValues)

        dispatch(importLiveValues(decoDoc.id, liveValuesById))

        const insertChange = DecoComponentUtils.createChangeToInsertComponent(
            componentInfo,
            metadata,
            decoDoc,
            decoRanges
        )

        dispatch(edit(decoDoc.id, insertChange))
    }
}


//插入组件模板文本
export const insertTemplate = (decoDoc, text, metadata = {}, imports, groupName) => (dispatch, getState) => {

    let liveValues = metadata.liveValues || []

    // TODO: Add groups better
    if (groupName) {
        liveValues = LiveValueGroupUtils.setLiveValueGroupsFromImportName(
            liveValues,
            groupName,
            getState().metadata.liveValues,
            decoDoc.id
        )
    }

    //how decoRanges come
    const {decoRanges, liveValuesById} = LiveValueUtils.normalizeLiveValueMetadata(liveValues)

    dispatch(importLiveValues(decoDoc.id, liveValuesById))


    //decoRanges分别对应liveValues的范围,为包含5个子项的数组
    const insertChange = DecoComponentUtils.createChangeToInsertTemplate(
        decoDoc,
        text,
        decoRanges
    )


    dispatch(edit(decoDoc.id, insertChange))

    // Add each import separately, as each import will change the line numbers of
    // subsequent imports. History events are merged based on timestamp, so they
    // will still become one event.
    //i just want to make it clear
    _.each(imports, (importValue, importKey) => {
        const importChange = DecoComponentUtils.createChangeToInsertImport(
            decoDoc,
            importKey,
            importValue
        )
        dispatch(edit(decoDoc.id, importChange))
    })
}

export const ADD_DECO_RANGE = 'ADD_DECO_RANGE'
export const addDecoRangeFromCMToken = (id, cmToken) => {
    return (dispatch, getState) => {
        const decoDoc = getCachedDecoDoc(getState().editor.docCache, id)
        const existingDecoRange = decoDoc.getDecoRangeForCMPos(cmToken.from)

        let decoChange

        if (existingDecoRange) {
            decoChange = DecoChangeFactory.createChangeToRemoveDecoRange(existingDecoRange)
        } else {

            // Construct decoChange from cmToken
            const decoRangeId = uuid()
            const decoRange = new DecoRange(decoRangeId, cmToken.from, cmToken.to)
            decoChange = DecoChangeFactory.createChangeToAddDecoRange(decoRange)

            const rangeName = DecoRangeUtils.guessDecoRangeName(decoDoc, decoRange)
            const text = decoDoc.cmDoc.getRange(decoRange.from, decoRange.to)

            ga('send', {
                hitType: 'event',
                eventCategory: 'LiveValue',
                eventAction: 'create',
                eventValue: text,
            })

            dispatch(createLiveValue(id, decoRangeId, text, rangeName, cmToken.type))
        }

        const transformedChange = DecoChangeTransformer.transformDecoChange(
            decoChange,
            decoDoc.decoRanges
        )

        decoDoc.edit(transformedChange)
        dispatch(addToHistory(id, transformedChange))

        dispatch(setLiveValuesForDoc(id, decoDoc))
    }
}

export const DOC_ID_CHANGE = 'DOC_ID_CHANGE'
export const docIdChange = (oldId, newId) => {
    return {
        type: DOC_ID_CHANGE,
        oldId,
        newId,
    }
}

function _getFileData(path) {
    return {
        type: GET_FILE_DATA,
        path,
    }
}
export function openDocument(fileInfo) {
    return (dispatch, getState) => {
        const state = getState()
        if (state.editor && state.editor.docCache && state.editor.docCache[fileInfo.id]) {
            dispatch(setCurrentDoc(fileInfo.id))
            return Promise.resolve()
        } else {

            //fileInfo.absolutePath is <Array>
            return request(_getFileData(fileInfo.absolutePath)).then((payload) => {
                //payload:{ id: ,absolutePathArray,utf8Data}
                //the behavious below is very important
                dispatch(cacheDoc(payload))
                dispatch(setCurrentDoc(payload.id))
            })
        }
    }
}
