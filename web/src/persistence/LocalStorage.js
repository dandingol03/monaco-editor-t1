
import _ from 'lodash'
import { EventEmitter, } from 'events'

class LocalStorage extends EventEmitter {

    constructor() {
        super()
        window.addEventListener('storage', this.emitChange.bind(this))
    }


    emitChange({key, newValue}) {
        this.emit(key, this.normalizeItem(newValue))
    }

    //格式化String->Json
    normalizeItem(item) {
        if (! item) {
            return null
        }
        return JSON.parse(item)
    }

    loadObject(key, withDefault = {}) {

        // Returns a string if key exists, or undefined otherwise
        const item = localStorage.getItem(key)
        if(key=='RECENT_PROJECTS')
            alert(item);
        return this.normalizeItem(item) || withDefault
    }

    saveObject(key, object = {}) {
        localStorage.setItem(key, JSON.stringify(object))
    }

}

export default new LocalStorage()
