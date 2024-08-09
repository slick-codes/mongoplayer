

import React from "react"
import { RangeHandler } from "../../store/types"
import AudioLeft from "../icons/AudioLeft"
import AudioRight from "../icons/AudioRight"
import HeartFill from "../icons/HeartFil"
import Play from "../icons/Play"
import RepeatOne from "../icons/RepeatOne"
import Repeat from "../icons/Shuffle"
import VolumeHigh from "../icons/VolumeHigh"
import VolumeLow from "../icons/VolumeLow"
import VolumeMute from "../icons/VolumeMute"
import "./../../styles/control.scss"
import ProgressBar from "./ProgressBar"
import VolumeEmpty from "../icons/VolumeEmpty"

function Control() {

    const [range, setRange] = React.useState({ volume: 0, progress: 0 })
    const [isMute, setMuteState] = React.useState(true)

    const toggleMuteState = function() {
        setMuteState(state => !state)
    }

    const volumeHandler = function(data: RangeHandler) {
        if (isMute) setMuteState(false)
        setRange(rage => ({ ...rage, volume: data.valueInPasentage }))
    }

    const progressBarHandler = function(data: RangeHandler) {
        setRange(rage => ({ ...rage, progress: rage.progress + data.valueInPasentage }))
    }


    const volumeManager = function() {

    }


    return (<>
        <section className="control">
            <div className="control__content">
                <section>
                    <div className="likeButton">
                        <button><HeartFill /></button>
                    </div>
                    <div className="audio_title">
                        <h1>Stubborn | vai9ja.com</h1>
                        <h6>Victony -Ft. Asake</h6>
                    </div>
                </section>
                <section className="controlButtons">
                    <div>
                        <div>
                            <button><AudioLeft /></button>
                        </div>
                        <div>
                            <button>
                                <Play />
                            </button>
                        </div>
                        <div>
                            <button>
                                <AudioRight />
                            </button>
                        </div>

                    </div>
                </section>
                <section>
                    <div className="filter">
                        <div>
                            <button>
                                <Repeat />
                            </button>
                        </div>
                        <div>
                            <button>
                                <RepeatOne />
                            </button>
                        </div>
                    </div>
                    <div className="timmer">
                        <span>00:23</span>/ <span>02:34</span>
                    </div>
                    <div className="volume">
                        <div>
                            <button onClick={toggleMuteState}>
                                {
                                    isMute ? <VolumeMute /> :
                                        range.volume >= 80 ? <VolumeHigh /> :
                                            range.volume > 10 ? <VolumeLow /> : <VolumeEmpty />
                                }
                            </button>
                        </div>
                        <div>
                            <ProgressBar width={20} callback={volumeHandler} />
                        </div>
                    </div>
                </section>
            </div>
            <ProgressBar width={20} callback={progressBarHandler} />

        </section>
    </>)
}



export default Control
