import React from "react";
import Collaps from "../icons/Collaps";

// import styles
import "./../../styles/collaper.scss"



interface DropDownProps {
    open: Boolean;
    text: String;
    children: React.ReactNode;
}

const DropDown: React.FC<DropDownProps> = function(props) {

    let [open, setOpenState] = React.useState(props.open)
    // handle open state toggling 
    function toggleDropDown() {
        setOpenState(state => !state)
    }

    return (
        <>
            <div className="collaper">
                <div className="collaper__name" onClick={toggleDropDown}>
                    <span>{props.text}</span>
                    <span>
                        <Collaps direction={open ? "down" : "up"} />
                    </span>
                </div>

                {open && (
                    <ul className="collaper__content">
                        {props.children}
                    </ul>
                )}

            </div>
        </>
    )
}


export default DropDown
