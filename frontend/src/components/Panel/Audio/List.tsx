import VerticalMenu from '../../icons/VerticalMenu'
import './../../../styles/list.scss'
import { Audio } from './../../../store/types'

interface Props {
    audios: Audio[]
}

const List: React.FC<Props> = function (props: Props) {
    return (
        <>
            <section className="list">
                <div className="overflow"></div>
                <div className="list__container">
                    <header className="list__header">
                        <div>Title</div>
                        <div>Artist</div>
                        <div>Album</div>
                        <div>Added</div>
                        <div>Duration</div>
                        <div></div>
                    </header>
                    <div className="list__content">
                        <div className="list__item__container">
                            {props.audios.map((audio, _index) => (
                                <div className="audio__item">
                                    <>
                                        <div>{audio.Title || audio.FileName}</div>
                                        <div>{audio.Artist}</div>
                                        <div>{audio.Album || audio.AlbumArtist || 'unknonw'}</div>
                                        <div>2 weeks ago</div>
                                        <div>06:54</div>
                                        <div>
                                            <button>
                                                <VerticalMenu />
                                            </button>
                                        </div>
                                    </>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default List
