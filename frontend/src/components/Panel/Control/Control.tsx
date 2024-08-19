import React from "react"
import { RangeHandler } from "../../../store/types"
import AudioLeft from "../../icons/AudioLeft"
import AudioRight from "../../icons/AudioRight"
import HeartFill from "../../icons/HeartFil"
import Play from "../../icons/Play"
import RepeatOne from "../../icons/RepeatOne"
import Repeat from "../../icons/Shuffle"
import VolumeHigh from "../../icons/VolumeHigh"
import VolumeLow from "../../icons/VolumeLow"
import VolumeMute from "../../icons/VolumeMute"
import "./../../../styles/control.scss"
import ProgressBar from "./ProgressBar"
import VolumeEmpty from "../../icons/VolumeEmpty"

function Control() {

  const [range, setRange] = React.useState({ volume: 0, progress: 0 })

  const [audioData, setAudioData] = React.useState({
    isMute: false,
    paused: false,
    shuffle: true,
    repeatStyle: "none"
  })



  const toggleMuteState = function() {
    setAudioData(state => ({ ...state, isMute: !state.isMute }))
  }

  const volumeHandler = function(data: RangeHandler) {
    // unmute audio if it is muted 
    if (audioData.isMute) toggleMuteState()
    setRange(rg => ({ ...rg, volume: data.positionInPercentage }))
  }

  const progressBarHandler = function(data: RangeHandler) {
    setRange(rg => ({ ...rg, progress: data.positionInPercentage }))
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
                  audioData.isMute ? <VolumeMute /> :
                    range.volume >= 80 ? <VolumeHigh /> :
                      range.volume > 10 ? <VolumeLow /> : <VolumeEmpty />
                }
              </button>
            </div>
            <div>
              <ProgressBar position={20} callback={volumeHandler} />
            </div>
          </div>
        </section>
      </div>
      <ProgressBar position={20} callback={progressBarHandler} />

    </section>
  </>)
}



export default Control
