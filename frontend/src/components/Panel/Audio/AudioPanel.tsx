import { Audio, ViewState } from '../../../store/types'
import Albums from './Albums'
import List from './List'

interface Props {
    audios: Audio[]
    state: ViewState
}

const AudioPanel: React.FC<Props> = function (props: Props) {
    const selectState = (props: Props) => {
        switch (props.state.toLowerCase()) {
            case ViewState.Songs:
                return <List audios={props.audios} />
            case ViewState.Albums:
                return <Albums audios={props.audios} />
        }
    }

    return (
        <>
            <section className="audiolist">{selectState(props)}</section>
        </>
    )
}

export default AudioPanel
