import Control from './Control/Control'
import './../../styles/panel.scss'
import List from './Audio/List'
import AudioPanel from './Audio/AudioPanel'
import { useEffect, useState } from 'react'
import { Audio, ViewState } from '../../store/types'
import { EventsEmit, EventsOn } from './../../../wailsjs/runtime'
import Header from './Audio/Header/Header'
import { view } from '../../store/scripts'

function Panel() {
    const [audios, setAudios] = useState([] as Audio[])
    const [viewState, _setViewState] = useState(ViewState.Albums)
    // console.log(view)

    useEffect(() => {
        EventsEmit('increment')
        EventsOn('get-audios', function (d) {
            setAudios((a: Audio[]) => [...a, d])
        })
    }, [])

    return (
        <>
            <section className="panel">
                <div className="panel__container">
                    <Header />
                    <AudioPanel audios={audios} state={viewState}></AudioPanel>
                    <Control />
                </div>
            </section>
        </>
    )
}

export default Panel
