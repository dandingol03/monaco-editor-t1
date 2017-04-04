

const Enum = function(names = [], offset = 0, geometric = 0) {
    if (typeof names === 'string') {
        names = Array.prototype.slice.call(arguments)
        offset = 0
        geometric = 0
    }
    let e = {}
    names.forEach((name, i) => {
        let j = i
        j = ! offset ? j : j + offset
        j = ! geometric ? j : Math.pow(geometric, j)
        e[e[name] = j] = name
    })
    return e
}

export default Enum
