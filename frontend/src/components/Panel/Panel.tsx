
import Control from "./Control/Control"
import "./../../styles/panel.scss"
import List from "./AudiosPanel/List"


function Panel() {
    return (
        <>
            <section className="panel">
                <div className="panel__container">
                    <section>Header</section>
                    <List />
                    <Control />
                </div>
            </section>
        </>
    )
}



export default Panel
