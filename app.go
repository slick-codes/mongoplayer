package main

import (
	"context"
	"fmt"
	"log"
	handler "mongoplayer/cmd"
	"mongoplayer/cmd/helpers"
	"mongoplayer/cmd/server"
	"os/user"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

type App struct {
	ctx context.Context
}

func NewApp() *App {
	return &App{}
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx

	//initiate server
	srv := server.Init()
	// Start Server
	srv.Run(4)

}

func (a *App) domReady(ctx context.Context) {
	a.ctx = ctx

	// usr, err := user.Current()
	// if err != nil {
	// 	log.Fatal(err)
	// }

	// runtime.EventsOn(ctx, "increment", func(optionalData ...interface{}) {
	// 	go handler.ScanForAudio(ctx, []string{usr.HomeDir}, func(file helpers.Audio) {
	// 		runtime.EventsEmit(ctx, "get-all-audios", file)
	// 	})
	// })
}

func (a *App) Log(message string) string {
	return fmt.Sprintf("%v was printed from the fronend", message)
}

func (a *App) Greet() string {
	var greetings string = "Welcome"
	return fmt.Sprintf("%v", greetings)
}
