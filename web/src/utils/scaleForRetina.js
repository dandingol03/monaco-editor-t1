

import _ from 'lodash'
import Display from '../events/Display'

const SIMPLE_PROPERTY_RE = /^(\d+)(px)?(%)?$/

const scaleProperty = (value) => {
    const type = typeof value
    if (type === 'number') {
        return value * Display.scale
    } else if (type === 'string') {
        const match = value.match(SIMPLE_PROPERTY_RE)
        if (match) {
            const number = parseInt(match[1])
            if (! _.isNaN(number)) {
                const result = '' + number * Display.scale
                if (match[2]) {
                    return result + 'px'
                } else if (match[3]) {
                    return result + '%'
                } else {
                    return result
                }
            }
        }
    }
    return value
}

const scaleMultipleProperty = (value) => {
    const properties = value.split(' ')
    return properties.map(scaleProperty).join(' ')
}

const propertyTransforms = {
    width: scaleProperty,
    height: scaleProperty,
    borderRadius: scaleProperty,
    borderTopRightRadius: scaleProperty,
    borderTopLeftRadius: scaleProperty,
    borderBottomRightRadius: scaleProperty,
    borderBottomLeftRadius: scaleProperty,
    fontSize: scaleProperty,
    lineHeight: scaleProperty,
    WebkitMaskSize: scaleMultipleProperty,
}

const scaleForRetina = (style, isTopLevel = true) => {
    style = _.cloneDeep(style)

    if (! Display.isRetina) {
        return style
    }

    const scaledStyle = _.mapValues(style, (value, key) => {
        if (propertyTransforms[key] != null) {
            return propertyTransforms[key](value)
        }
        return value
    })

    if (isTopLevel) {
        scaledStyle.transform = 'translate3d(0,0,0) scale(0.5)'
        scaledStyle.transformOrigin = '0 0'
    }

    return scaledStyle
}

const scaleAndApplyStylesForRetina = (style, styles = {}, isTopLevel) => {
    let scaledStyle = scaleForRetina(style, isTopLevel)

    if (Display.isRetina) {
        if (styles.x2) {
            scaledStyle = _.extend({}, scaledStyle, styles.x2)
        }
    } else {
        if (styles.x1) {
            scaledStyle = _.extend({}, scaledStyle, styles.x1)
        }
    }

    return scaledStyle
}

export {
    scaleForRetina,
    scaleAndApplyStylesForRetina,
}

// let testStyle = {width: 10, height: '10px', oobleck: 10, WebkitMaskSize: '10px 20px'}
// console.log('testStyle', scaleForRetina(testStyle))
