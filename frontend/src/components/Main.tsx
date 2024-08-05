import Nav from "./Navigation/Nav"
import Panel from "./Panel/Panel"

// importing css files 
import "./../styles/main.scss"


function Main() {
    return (
        <>
            <main className="main">
                <Nav />
                <Panel />
            </main>
        </>
    )
}



export default Main
