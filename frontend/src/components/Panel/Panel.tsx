

import Control from "../AudioControl/Control"
import "./../../styles/panel.scss"


function Panel() {
    return (
        <>
            <section className="panel">
                <div className="panel__container">
                    <section>Header</section>
                    <section>List</section>
                    <Control />
                </div>
            </section>
        </>
    )
}



export default Panel
