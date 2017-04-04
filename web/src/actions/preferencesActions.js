
import _ from 'lodash'
import LocalStorage from '../persistence/LocalStorage'
import { ROOT_KEY, CATEGORIES, PREFERENCES, METADATA } from '../constants/PreferencesConstants'

import ApplicationConstants from '../constants/ipc/ApplicationConstants'
const {
    BROADCAST_PREFERENCES,
} = ApplicationConstants

import WindowConstants from '../constants/ipc/WindowConstants'
const {
    OPEN_PATH_CHOOSER_DIALOG,
} = WindowConstants

import request from '../ipc/Request'

export const SET_PREFERENCE = 'SET_PREFERENCE';
export const setPreference = (categoryKey, key, value) => {
    return {
        type: SET_PREFERENCE,
        payload: {
            categoryKey,
            key,
            value,
        }
    }
}

export const mergeSystemPreferences = (preferences) => {
    return function (dispatch, getState) {
        const currPreferences = getState().preferences
        _.each(_.keys(preferences), (categoryKey) => {
            _.each(_.keys(preferences[categoryKey]), (key) => {
                if (currPreferences[categoryKey][key] == METADATA[categoryKey][key].defaultValue) {
                    dispatch(setPreference(categoryKey, key, preferences[categoryKey][key]))
                }
            })
        })
        return Promise.resolve()
    }
}

export const setSystemLocationPreference = (categoryKey, key, propertyType = 'openDirectory', title = 'Select Location') => {
    return function (dispatch) {
        return request(
            { type: OPEN_PATH_CHOOSER_DIALOG, propertyType, title, }
        ).then((resp) => {
            dispatch({
                type: SET_PREFERENCE,
                payload: {
                    categoryKey,
                    key,
                    value: resp.path,
                }
            })
        })
    }
}

export const SET_PREFERENCES = 'SET_PREFERENCES'
export const setPreferences = (preferences) => {
    request({type: BROADCAST_PREFERENCES, preferences, })
    return {
        type: SET_PREFERENCES,
        payload: preferences,
    }
}

export const savePreferences = () => {
    return function(dispatch, getState) {
        request({type: BROADCAST_PREFERENCES, preferences: getState().preferences, })
        LocalStorage.saveObject(ROOT_KEY, getState().preferences)
    }
}
