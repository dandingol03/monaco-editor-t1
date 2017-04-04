
import _ from 'lodash'

import LocalStorage from '../persistence/LocalStorage'

const SIMULATOR_KEY = 'SIMULATOR'

export default {
    getSimulatorLaunchedLast() {
        const saved = LocalStorage.loadObject(SIMULATOR_KEY)
        if (!saved) {
            return ''
        }
        return saved.lastLaunched
    },
    didLaunchSimulator(simInfo, platform) {
        const saved = LocalStorage.loadObject(SIMULATOR_KEY)
        LocalStorage.saveObject(SIMULATOR_KEY, {
            ...saved,
            lastLaunched: {
                simInfo,
                platform,
            },
        })
    },
}
