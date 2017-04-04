

import React, { Component, } from 'react'

const Icon = ({ iconUrl, iconUrl2x, style }) => (
    <div style={{
        ...style,
        backgroundImage: `-webkit-image-set(url(${iconUrl}) 1x, url(${iconUrl2x}) 2x)`,
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat',
    }} />
)

export default Icon
