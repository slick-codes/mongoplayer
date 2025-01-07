import { useState } from 'react'
// import { ViewState } from './types'

const [view, setView] = useState('testing')

const setViewState = function (state: string) {
    console.log(state)
}

export default {
    view,
    setView,
    setViewState,
}
