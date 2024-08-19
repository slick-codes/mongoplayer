package main

import (
	"embed"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/wailsapp/wails/v2/pkg/options/linux"
	// "github.com/wailsapp/wails/v2/pkg/runtime"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := NewApp()

	// Create application with options
	err := wails.Run(&options.App{
		Title:      "mongoplayer",
		Width:      990,
		Height:     600,
		MinWidth:   990,
		Frameless:  false,
		MinHeight:  600,
		Fullscreen: false,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},

		// Linux configuration
		Linux: &linux.Options{
			WindowIsTranslucent: false,
		},

		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.startup,
		OnDomReady:       app.domReady,
		// Debug:            options.Debug{OpenInspectorOnStartup: true},
		Bind: []interface{}{
			app,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
