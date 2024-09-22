import React from 'react'
import { Audio } from '../../../store/types'

// import style
import './../../../styles/albums.scss'

interface Props {
    audios: Audio[]
}

interface AlbumAudio {
    bgImages: string[]
    albumName: string
    audios: Audio[]
}

const Albums: React.FC<Props> = function (props: Props) {
    const sanitizedAudio: AlbumAudio[] = new Array()

    const data: any = {}

    // React.useEffect(() => {
    console.log(props.audios)

    props.audios.forEach((audio: Audio) => {
        let albumName = audio.Album || audio.AlbumArtist || 'unknown'
        if (!data[albumName]) {
            data[albumName] = []
        }

        data[albumName].push(audio)
    })

    for (let a of Object.keys(data)) {
        console.log('looping')
        let key = a
        let bgImages: string[] = new Array()

        for (let i = 0; i < data[key].length; i++) {
            const picture = data[key][i].Picture

            if (!picture) {
                continue
            }
            const img = `data:images/${picture.Ext};base64,${picture.Data}`
            // if (bgImages.includes(img)) {
            //     continue
            // }

            bgImages.push(img)

            if (bgImages.length > 0) {
                break
            }
        }

        sanitizedAudio.push({
            albumName: key,
            bgImages: bgImages,
            audios: data[a],
        })
    }
    // }, [])

    return (
        <>
            <section className="albums">
                <div className="albums__container">
                    {sanitizedAudio.map((a) => {
                        return (
                            <div className="albums__card">
                                <div className="card">
                                    <img src={a.bgImages[0]} />
                                </div>
                                <span>{a.albumName}</span>
                            </div>
                        )
                    })}
                </div>
            </section>
        </>
    )
}

export default Albums
