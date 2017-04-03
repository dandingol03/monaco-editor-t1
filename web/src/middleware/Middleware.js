

/**
 * Middleware to interact with Monaco and CodeMirror events
 */
class Middleware {

    set dispatch(dispatch) {
        this._dispatch = dispatch
    }

    get dispatch() {
        if (! this._dispatch) {
            throw new Error('Middleware not property initialized with dispatch function')
        }
        return this._dispatch
    }

    get eventListeners() {
        return {}
    }

    attach(/* decoDoc */) {
        throw new Error('Attach not implemented by subclass')
    }

    detach() {
        throw new Error('Detach not implemented by subclass')
    }

}

export default Middleware
