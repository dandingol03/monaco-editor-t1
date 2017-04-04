

var   _ = require('lodash');

var  CATEGORIES=_.mapKeys([
    'GENERAL',
    'SAVING',
    'EDITOR',
]);
var PREFERENCES={
    [CATEGORIES.GENERAL]: _.mapKeys([
        'ANDROID_HOME',
        'GENYMOTION_APP',
        'USE_GENYMOTION',
    ]),
    [CATEGORIES.SAVING]: _.mapKeys([
        'AUTOSAVE',
        'PROPERTY_CHANGE',
        'TEXT_EDIT',
        'DEBOUNCE',
    ]),
    [CATEGORIES.EDITOR]: _.mapKeys([
        'VIM_MODE',
        'SHOW_INVISIBLES',
        'SHOW_INDENT_GUIDES',
        'HIGHLIGHT_ACTIVE_LINE',
        'NPM_REGISTRY',
    ]),
};

module.exports={
    ROOT_KEY:'PREFERENCES',
    CATEGORIES:CATEGORIES,
    PREFERENCES:PREFERENCES,
    METADATA:{
        [CATEGORIES.GENERAL]: {
            [PREFERENCES[CATEGORIES.GENERAL].ANDROID_HOME]: {
                defaultValue: '',
            },
            [PREFERENCES[CATEGORIES.GENERAL].GENYMOTION_APP]: {
                defaultValue: '',
            },
            [PREFERENCES[CATEGORIES.GENERAL].USE_GENYMOTION]: {
                defaultValue: false,
            },
        },
        [CATEGORIES.SAVING]: {
            [PREFERENCES[CATEGORIES.SAVING].AUTOSAVE]: {
                defaultValue: true,
            },
            [PREFERENCES[CATEGORIES.SAVING].PROPERTY_CHANGE]: {
                defaultValue: true,
            },
            [PREFERENCES[CATEGORIES.SAVING].TEXT_EDIT]: {
                defaultValue: true,
            },
            [PREFERENCES[CATEGORIES.SAVING].DEBOUNCE]: {
                defaultValue: 1500,
            },
        },
        [CATEGORIES.EDITOR]: {
            [PREFERENCES[CATEGORIES.EDITOR].VIM_MODE]: {
                defaultValue: false,
            },
            [PREFERENCES[CATEGORIES.EDITOR].SHOW_INVISIBLES]: {
                defaultValue: false,
            },
            [PREFERENCES[CATEGORIES.EDITOR].HIGHLIGHT_ACTIVE_LINE]: {
                defaultValue: true,
            },
            [PREFERENCES[CATEGORIES.EDITOR].SHOW_INDENT_GUIDES]: {
                defaultValue: false,
            },
            [PREFERENCES[CATEGORIES.EDITOR].NPM_REGISTRY]: {
                defaultValue: 'https://registry.npmjs.org',
            },
        }
    }


};





