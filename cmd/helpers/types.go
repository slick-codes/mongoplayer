package helpers

import (
	"io/fs"
	"os"
	"time"

	"github.com/unitnotes/audiotag"
)

// Audio struct
type Audio struct {
	FileDir          string
	ServerDir        string
	Ext              string
	Size             int64
	FileName         string
	NameInDir        string
	Year             int16
	Title            string
	Genre            string
	Artist           string
	Album            string
	Image            string
	Duration         int32
	DiscTotal        int8
	DiscNumber       int8
	TrackNumber      int8
	TrackTotal       int8
	Composer         string
	Lyrics           string
	AlbumArtist      string
	ModificationTime time.Time

	Picture *audiotag.Picture
}

type FileInfo struct {
	Path             string
	Stat             fs.DirEntry
	Ext              string
	FileName         string
	Size             int64
	File             *os.File
	ModificationTime time.Time
}
