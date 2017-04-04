

export const ADD_TAB = 'ADD_TAB'
export const addTab = (containerId, tabId, position) => {
    return {
        type: ADD_TAB,
        payload: {
            containerId,
            tabId,
            position,
        }
    }
}

// TODO: Implement
export const MOVE_TAB = 'MOVE_TAB'
export const moveTab = (containerId, tabId, position) => {
    return {
        type: MOVE_TAB,
        payload: {
            containerId,
            tabId,
            position,
        }
    }
}

export const CLOSE_TAB = 'CLOSE_TAB'
export const closeTab = (containerId, tabId) => {
    return {
        type: CLOSE_TAB,
        payload: {
            containerId,
            tabId,
        }
    }
}

export const CLOSE_ALL_TABS = 'CLOSE_ALL_TABS'
export const closeAllTabs = (containerId) => {
    return {
        type: CLOSE_ALL_TABS,
        payload: {
            containerId,
        }
    }
}

export const FOCUS_TAB = 'FOCUS_TAB'
export const focusTab = (containerId, tabId) => {
    return {
        type: FOCUS_TAB,
        payload: {
            containerId,
            tabId,
        }
    }
}
export const clearFocusedTab = (containerId) => {
    return {
        type: FOCUS_TAB,
        payload: {
            containerId,
            tabId: null,
        }
    }
}

export const SWAP_TAB = 'SWAP_TAB'
export const swapTab = (containerId, tabId, newTabId) => {
    return {
        type: SWAP_TAB,
        payload: {
            containerId,
            tabId,
            newTabId,
        }
    }
}

export const MAKE_TAB_PERMANENT = 'MAKE_TAB_PERMANENT'
export const makeTabPermanent = (containerId) => {
    return {
        type: MAKE_TAB_PERMANENT,
        payload: {
            containerId,
        }
    }
}
