
const fs = Electron.remote.require('fs')

export default {
    isLocal(url) {
        return ! url.startsWith('http')
    },
    fetchLocal(url) {
        try {
            const text = fs.readFileSync(url, 'utf8')
            return Promise.resolve({
                text: () => text,
                json: () => JSON.parse(text),
            })
        } catch (e) {
            return Promise.reject(e)
        }
    },
    fetchResource(url) {
        if (this.isLocal(url)) {
            return this.fetchLocal(url)
        } else {
            return fetch(url)
        }
    },
}
