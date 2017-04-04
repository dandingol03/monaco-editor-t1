

import { EventEmitter, } from 'events'

class Display extends EventEmitter {
    constructor() {
        super()

        this.isRetina = window.devicePixelRatio >= 2
        this.scale = this.isRetina ? 2 : 1

        this._listenToDisplayChange()
    }

    _listenToDisplayChange() {

        // http://stackoverflow.com/questions/28905420/window-devicepixelratio-change-listener
        window.matchMedia('screen and (min-resolution: 2dppx)').addListener((e) => {
            if (e.matches) {
                this.isRetina = true
                this.scale = 2
            } else {
                this.isRetina = false
                this.scale = 1
            }

            this.emit('scale', this.scale)
        })
    }
}

export default new Display()
