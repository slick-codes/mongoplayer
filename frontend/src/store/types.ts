export interface RangeHandler {
    position: number
    positionInPercentage: number
}

export type RangeCallback = (data: RangeHandler) => void

export interface Audio {
    FileDir: string
    ServerDir: string
    Ext: string
    Size: number
    FileName: string
    NameInDir: string
    Year: number
    Title: string
    Genre: string
    Artist: string
    Album: string
    Image: string
    Duration: number
    DiscTotal: number
    DiscNumber: number
    TrackNumber: number
    TrackTotal: number
    Composer: string
    Lyrics: string
    AlbumArtist: string
    ModificationTime: Date
    Picture: Picture
}

interface Picture {
    Ext: string
    Description: string
    MIMEType: string
    Type: string
    Data: string
}

export enum ViewState {
    Songs = 'songs-state',
    Artists = 'artists-state',
    Albums = 'albums-state',
}
