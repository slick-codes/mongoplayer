import React from "react";

import NavBar from "../icons/NavBar";
import DropDown from "./DropDown";
import Desktop from "../icons/Desktop";
import Download from "../icons/Download";
import Document from "../icons/Document";
import MusicDir from "../icons/MusicDir";
import Media from "../icons/Media";
import Heart from "./../icons/Heart"

import "./../../styles/nav.scss"
import Playing from "../icons/Playing";
import Settings from "../icons/Settings";


interface Directory {
    name: string,
    dir: string,
    icon: React.ComponentType | string,
}

interface Playlist {
    name: string;
    icon: React.ComponentType | string
}

export default function() {
    const directories: Directory[] = [
        { name: "All Audio", dir: "", icon: Media },
        { name: "Music", dir: "", icon: MusicDir },
        { name: "Desktop", dir: "", icon: Desktop },
        { name: "Documents", dir: "", icon: Document },
        { name: "Download", dir: "", icon: Download },
    ]

    const playlist: Playlist[] = [
        { name: "Favorite", icon: Heart },
    ]

    // toggle navigation handlers
    const [navIsOpen, setNavState] = React.useState(true)
    const toggleNavState = () => setNavState(state => !state)

    const openFolder = function() {
        const input = document.createElement("input")
        input.type = "file"
        input.setAttribute("webkitdirectory", "")
        input.setAttribute("directory", "")
        input.setAttribute("multiple", "")
        console.log(input)
        input.click()
    }



    return (
        <>
            <aside className={`nav ${!navIsOpen && "--closed"}`}>
                <div className="nav__container">
                    <div className="nav__content">

                        <section className="nav__toggler">
                            <div onClick={toggleNavState}>
                                <NavBar />
                            </div>
                        </section>

                        <section className="nav__directory_container">
                            <DropDown open={true} text="Directories">
                                <div className="nav__dropdown-conatiner">
                                    {directories.map((directory, key) => {
                                        return (
                                            <>
                                                <li>
                                                    <span
                                                        title={!navIsOpen ? directory.name : undefined} key={key}>
                                                        {directory.icon && <directory.icon />}
                                                    </span>
                                                    <span>{directory.name}</span>
                                                </li>
                                            </>
                                        )
                                    })}
                                    <li>
                                        <button onClick={openFolder}>Add</button>
                                    </li>
                                </div>
                            </DropDown>
                        </section>

                        <section className="nav__playlist_container">
                            <DropDown open={true} text="Playlist">
                                <div className="nav__playlist-container">
                                    {playlist.map((item, key) => {
                                        return (
                                            <>
                                                <li>
                                                    <span title={!navIsOpen ? item.name : undefined} key={key}>{item.icon && <item.icon />}</span>
                                                    <span>{item.name}</span>
                                                </li>
                                            </>
                                        )
                                    })}
                                    <li><button>Create</button></li>
                                </div>
                            </DropDown>
                        </section>
                    </div>
                    <section>
                        <ul>
                            <li>
                                <span> <Playing /> </span>
                                <span>Now Playing</span>
                            </li>
                            <li>
                                <span><Settings /></span>
                                <span>Settings</span>
                            </li>
                        </ul>
                    </section>
                </div>

            </aside>
        </>
    )
}
