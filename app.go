package main

import (
	"context"
	"fmt"
    "os/user"
    "os"
    "io/fs"
    // "errors"
    "io"
    "strings"
    "log"
    // "github.com/wailsapp/wails/v2/pkg/runtime"
    // "github.com/wailsapp/wails/v2/pkg/options"
)


// App struct
type App struct {
	ctx context.Context
}


// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}


type Audio struct {
    FileDir string
    Ext string
    FileName string
    Year string
    Title string
    Genre string
    Album string
    Artist string
    Image string
    Duration string
    ModificationTime string
}

type FileInfo struct {
    path string 
    stat fs.DirEntry
    memetype string
    buffer []byte 
}

var supportedExtentions = []string{"mp3", "wav", "ogg"}

func GetMemeType(path string )string{
    var strArr []string = strings.Split(path, ".")
    return strArr[len(strArr) - 1]  
}


func Contains(slice []string, item string) bool{
    for _, v := range slice {
        if v == item {
            return true
        }
    }

    return false
}


func (file *FileInfo) createAudio()(bool, error){
    fmt.Println(file.memetype)
   return true, nil 
}

func scanForAudio(ctx *context.Context, directories []string){

    for _, directory := range directories {
        filePaths, err := os.ReadDir(directory)
        // handle error's with certail directories 
        if err != nil { log.Fatal("Error", err)  }
       

        for _, filePath := range filePaths{
            var fullPath = directory + "/" + filePath.Name()

            if(filePath.IsDir()) {
                // Perform a recursive function that handled nested folders
                scanForAudio(ctx, []string{fullPath})
                continue
            }

            var memetype string = GetMemeType(fullPath)
            if !Contains(supportedExtentions, memetype){ continue }

            file, err := os.Open(fullPath)
            if err != nil { log.Fatal("Something went wrong with getting file info", err )}
            defer file.Close() // defer closes the file (Note this get pushed downwards in the file to run last)
          

            buffer := make([]byte, 1024) 
            var data []byte 

            for{
                bytesRead, err := file.Read(buffer)
                if err != nil {
                    if err == io.EOF { break }
                    log.Fatalf("Failed to read file: %v", err)
                }

                data = append(data, buffer[:bytesRead]...)
            }


            var fileInfo = FileInfo{
                path: fullPath,
                memetype: memetype,
                stat: filePath,
                buffer: data,
            }

            _, e := fileInfo.createAudio()
           if e != nil { log.Fatal("something weird happend", e)} 


        }

    }
}


// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
    

    // var directories 
    usr, err := user.Current();
    if err != nil { log.Fatal(err) }

   var directories = []string{
        usr.HomeDir ,
    }


    scanForAudio(&ctx, directories)

    
    // var index = 0;
    // runtime.EventsOn(ctx, "testing", func(_d ...interface{}){
    //     runtime.EventsEmit(ctx, "increment", index)
    //     index++
    // })

}




// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}


func (a *App) Test(name string) string {
    return fmt.Sprintf("Testing this stuff")
}


