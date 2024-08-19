import React, { useEffect } from "react"
import { RangeCallback } from "../../../store/types"

import "./../../../styles/range.scss"

interface Options {
    position: number,
    callback: RangeCallback
}

const ProgressBar: React.FC<Options> = function(props) {

    const [position, updateBarWidth] = React.useState({ position: props.position, positionInPercentage: 0 })
    const element: any = React.useRef(null)

    function rangeUpdater(event: MouseEvent | React.MouseEvent<HTMLDivElement>) {
        // prevent propagation (event bubbling)
        event.stopPropagation()

        const elementPosition = element.current.getBoundingClientRect()
        // get the position of the mouse relative to the position of the range element
        let mousePosition = event?.clientX - elementPosition.left
        // get the width of the range element
        const elementWidth = element.current.clientWidth
        // convet the vaolue of the offset to percentage
        let percentage = (mousePosition) / (elementWidth) * 100

        // construct the range obj and also fix cap it to a specific value range
        const data = {
            position: Math.min(elementWidth, Math.max(0, mousePosition)),
            positionInPercentage: Math.min(100, Math.max(0, percentage))
        }

        // update state
        updateBarWidth(data)
        // execute callback 
        if (props.callback instanceof Function)
            return props.callback(data)

    }

    function rangeEventHandler(_event: React.MouseEvent<HTMLDivElement> | MouseEvent) {
        document.onmousemove = rangeUpdater
        document.onmouseup = () => { document.onmousemove = null }
    }

    return (
        <div ref={element} className="progressBar" onClick={rangeUpdater} onMouseDown={rangeEventHandler}>
            <div className="bar">
                <div className="bar__container">
                    <div style={{ width: `${position.positionInPercentage}%` }}></div>
                    <div className="bar__dragabledot"></div>
                </div>
            </div>
        </div>
    )
}



export default ProgressBar
