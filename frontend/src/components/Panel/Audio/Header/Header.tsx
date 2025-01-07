import React from 'react'
import './../../../../styles/header.scss'
import defaultImage from './../../../../assets/images/default.png'
import Playing from '../../../icons/Playing'
import { ViewState } from '../../../../store/types'
import ev from '../../../../store/scripts'

interface Props {}

const Header: React.FC<Props> = function (_props: Props) {
    return (
        <>
            <section className="header" style={{ backgroundImage: `url(${defaultImage})` }}>
                <div className="header_image_panel" style={{ backgroundImage: `url(${defaultImage})` }}></div>
                <div className="content__container">
                    <div className="header__text">
                        <h1>All Audio</h1>
                        <h4>Directories</h4>
                    </div>
                    <div className="header__cta">
                        <button>
                            <Playing />
                            Shuffle all
                        </button>
                        <span className="breaker"></span>
                        <button
                            onClick={() => {
                                // console.log(ev.view)
                            }}
                        >
                            Songs
                        </button>
                        <button>Artist</button>
                        <button>Albums</button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Header
