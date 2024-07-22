import { useState } from 'react';
import logo from './assets/images/logo-universal.png';
import './App.css';
import { Greet } from "../wailsjs/go/main/App";
import { EventsEmit, EventsOn, WindowFullscreen } from "./../wailsjs/runtime/runtime"

function App() {

    const [resultText, setResultText] = useState("Please enter your name below 👇");
    const [name, setName] = useState('');
    const updateName = (e: any) => setName(e.target.value);
    const updateResultText = (result: string) => setResultText(result);

    const [index, setIndex] = useState(0)

    function greet() {
        // Greet(name).then(updateResultText);
        EventsEmit("testing", { name: "Paul" })
        EventsOn("increment", function(index) {
            setIndex(index)
        })
    }


    return (
        <div id="App">
            <img src={logo} id="logo" alt="logo" />
            <div id="result" className="result">{resultText}</div>
            <div id="input" className="input-box">
                <input id="name" className="input" onChange={updateName} autoComplete="off" name="input" type="text" />
                <button className="btn" onClick={greet}>{index} Greet</button>
            </div>
        </div>
    )
}

export default App
