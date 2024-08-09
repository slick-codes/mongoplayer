import React from "react"
import { RangeCallback } from "../../store/types"




interface Options {
    width: number,
    callback: RangeCallback
}


const ProgressBar: React.FC<Options> = function(props) {

    const [width, updateBarWidth] = React.useState(props.width)
    const element: any = React.useRef(null)

    function rangeUpdater(event: MouseEvent | React.MouseEvent<HTMLDivElement>) {
        // prevent propagation (event bubbling)
        event.stopPropagation()

        updateBarWidth((_bar: any): any => {
            const mousePosition = event?.clientX
            // check if offsetX is an integer

            const elementWidth = element.current.clientWidth
            const elementPosition = element.current.getBoundingClientRect()

            // convet the vaolue of the offset to persentage
            let persentage: number = (mousePosition - elementPosition.left) / (elementWidth) * 100
            if (persentage <= 0) return 0

            // ensure the valueInPasentage
            persentage = persentage < 0 ? 0 : persentage
            persentage = persentage > 100 ? 100 : persentage

            //setup callback if it exsit 
            if (typeof props.callback === "function")
                props.callback({ value: mousePosition, valueInPasentage: persentage })

            // update volume with this value
            return persentage
        })
    }

    function rangeEventHandler(_event: React.MouseEvent<HTMLDivElement> | MouseEvent) {
        document.onmousemove = rangeUpdater
        document.onmouseup = () => { document.onmousemove = null }
    }

    return (

        <div ref={element} className="progressBar" onClick={rangeUpdater} onMouseDown={rangeEventHandler}>
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
