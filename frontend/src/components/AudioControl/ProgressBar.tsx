import React from "react"
import { RangeCallback } from "../../store/types"




interface Options {
    width: number,
    callback: RangeCallback
}


const ProgressBar: React.FC<Options> = function(props) {


    const [width, updateBarWidth] = React.useState(props.width)

    function updateBar() {

    }
    function updateProgressBar(event: any) {

        updateBarWidth((_bar: any): any => {
            const offsetX = event?.offsetX || event?.nativeEvent?.offsetX

            // check if offsetX is an integer
            if (!offsetX) return 0

            const elemWidth = event.target.offsetWidth
            // convet the vaolue of the offset to persentage
            let valueInPasentage: number = (offsetX) / (elemWidth) * 100
            if (valueInPasentage <= 0) return 0

            //setup callback if it exsit 
            if (typeof props.callback === "function")
                props.callback({ value: offsetX, valueInPasentage })

            // update volume with this value
            return valueInPasentage
        })

        // setup mousemove 
        event.target.onmousemove = updateProgressBar

        // Prvent the mousemove from working when user unclicks the mouse 
        event.target.onmouseup = (e: any) => e.target.onmousemove = null
        event.target.onmouseover = (e: any) => e.target.onmousemove = null

    }

    return (

        <div className="progressBar" onMouseDown={updateProgressBar}>
            <div className="bar">
                <div className="bar__container">
                    <div style={{ width: `${width}%` }}></div>
                    <div className="bar__dragabledot"></div>
                </div>
            </div>
        </div>
    )
}



export default ProgressBar
