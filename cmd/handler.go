package handler

import (
	"context"
	"errors"
	"log"
	"mongoplayer/cmd/helpers"
	"mongoplayer/cmd/server"
	"os"
	"strings"

	"github.com/unitnotes/audiotag"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// setup a callback type
type Callback func(helpers.Audio)

// localize file info ( this allows me to assign a method to FileInfo)
type FileInfo helpers.FileInfo

func (file *FileInfo) createAudio() (helpers.Audio, error) {

	metaData, err := audiotag.ReadFrom(file.File)
	if err != nil {
		return helpers.Audio{}, errors.New(file.Path + " is not readable")
	}

	DiscNumber, DiscTotal := metaData.Disc()
	TrackNumber, TrackTotal := metaData.Track()

	audio := helpers.Audio{
		FileDir:          file.Path,
		ServerDir:        "http://localhost:" + server.Port + "?path=" + file.Path + "&ext=" + file.Ext,
		Ext:              file.Ext,
		FileName:         metaData.Title(),
		NameInDir:        file.FileName,
		Year:             int16(metaData.Year()),
		Genre:            metaData.Genre(),
		Artist:           metaData.Artist(),
		Composer:         metaData.Composer(),
		AlbumArtist:      metaData.AlbumArtist(),
		Lyrics:           metaData.Lyrics(),
		DiscNumber:       int8(DiscNumber),
		DiscTotal:        int8(DiscTotal),
		Duration:         int32(metaData.Duration()),
		TrackNumber:      int8(TrackNumber),
		TrackTotal:       int8(TrackTotal),
		Picture:          metaData.Picture(),
		ModificationTime: file.ModificationTime,
	}

	return audio, nil
}

func ScanForAudio(ctx context.Context, directories []string, callback Callback) bool {

	for _, directory := range directories {
		//
		// usr, err := user.Current()
		// if err != nil {
		// 	log.Fatal(err)
		// }

		filePaths, err1 := os.ReadDir(directory)
		//handle error's with certail directories
		if err1 != nil {
			log.Printf("There is an error with readig %v \n", directory)
			continue
		}

		for _, fileData := range filePaths {
			var fullPath string = directory + "/" + fileData.Name()
			fileInfo, err := fileData.Info()

			// prevent hidden files and folders
			if string(fileData.Name()[0]) == "." {
				continue
			}

			if fileData.IsDir() {
				// Perform a recursive execution to handle nested folders
				ScanForAudio(ctx, []string{fullPath}, callback)
				continue
			}

			// Prevent files that does not match the supported extention from being processed
			var extType, fileName string = helpers.GetMeme(fullPath)

			if !helpers.Contains(helpers.SupportedExtentions, strings.ToLower(extType)) {
				continue
			}

			file, err := os.Open(fullPath)
			if err != nil {
				runtime.LogWarning(ctx, "("+fullPath+") is curupted or unreadable")
				continue
			}

			fInfo := FileInfo{
				Path:             fullPath,
				Ext:              extType,
				FileName:         fileName,
				Stat:             fileData,
				Size:             fileInfo.Size(),
				File:             file,
				ModificationTime: fileInfo.ModTime(),
			}

			audio, err2 := fInfo.createAudio()
			if err2 != nil {
				// log.Print("There was an error with fileInfo.CreateAudio() ", err2)
				continue
			}

			callback(audio)
		}

	}

	return true
}
