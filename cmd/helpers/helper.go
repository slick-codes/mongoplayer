package helpers

import (
	"reflect"
	"strings"
)

var SupportedExtentions = []string{"mp3", "wav", "ogg"}

func Contains(slice interface{}, item interface{}) bool {
	// Use reflect lib to manage the slice
	s := reflect.ValueOf(slice)
	// check if slice if an actual slice
	if s.Kind() != reflect.Slice {
		panic("Parameta one should be a slice")
	}
	// Check if Interface has an item
	for i := 0; i < s.Len(); i++ {
		if reflect.DeepEqual(s.Index(i).Interface(), item) {
			return true
		}
	}

	return false
}

// Get Extention of a file
func GetMeme(path string) (string, string) {

	var fPathSlice = strings.Split(path, "/")
	fPath := fPathSlice[len(fPathSlice)-1]

	var fPathWithoutExtSlice = strings.Split(fPath, ".")
	fPathWithoutExt := strings.Join(fPathWithoutExtSlice[:len(fPathWithoutExtSlice)-1], " ")

	var stringSlice []string = strings.Split(fPath, ".")
	return stringSlice[len(stringSlice)-1], Ternary(fPathWithoutExt == "", fPath, fPathWithoutExt)
}

func Ternary(condition bool, block1 interface{}, block2 interface{}) string {

	b1 := reflect.ValueOf(block1)
	b2 := reflect.ValueOf(block2)

	if condition {
		return b1.String()
	} else {
		return b2.String()
	}

}
