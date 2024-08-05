package dir

import (
	"context"
	"log"
	"mongoplayer/cmd/helpers"
	"os"
	"strings"
	"time"
)

type Directory struct {
	Dir      string
	Children []DirChild
}

type DirChild struct {
	Type             string
	Path             string
	Ext              string
	FileName         string
	FileStatName     string
	ModificationTime time.Time
}

type Callback func([]Directory)

// get directories and images
func ScanDirectories(ctx context.Context, directories []string, callback Callback) {

	// Create Directory
	dirs := make([]Directory, 0)

	for _, directory := range directories {

		dir := Directory{
			Dir:      directory,
			Children: []DirChild{},
		}

		files, err1 := os.ReadDir(directory)
		// handle error's with files that fails to be read
		if err1 != nil {
			log.Printf("There is an error with reading file %v \n", directory)
			continue
		}

		for _, file := range files {

			fileInfo, err := file.Info()
			if err != nil {
				continue
			}

			var path string = directory + "/" + file.Name()

			var ext, fileName string = helpers.GetMeme(path)
			if !file.IsDir() && !helpers.Contains(helpers.SupportedExtentions, strings.ToLower(ext)) {
				continue
			}

			// trigger callback function
			dir.Children = append(dir.Children, DirChild{
				Type:             helpers.Ternary(file.IsDir(), "directory", "file"),
				Path:             path,
				Ext:              helpers.Ternary(file.IsDir(), "", ext),
				FileName:         fileName,
				ModificationTime: fileInfo.ModTime(),
			})
		}

		dirs = append(dirs, dir)
	}

	callback(dirs)
}

// Get data about any file
