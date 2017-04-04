
import _ from 'lodash'

import LocalStorage from '../persistence/LocalStorage'

const ONBOARDING_KEY = 'ONBOARDING'

export default {
    shouldOpenConsoleForFirstTime() {
        const saved = LocalStorage.loadObject(ONBOARDING_KEY)
        const {consoleShown = false} = saved
        return ! consoleShown
    },
    didOpenConsoleForFirstTime() {
        const saved = LocalStorage.loadObject(ONBOARDING_KEY)
        LocalStorage.saveObject(ONBOARDING_KEY, {
            ...saved,
            consoleShown: true,
        })
    },
}
