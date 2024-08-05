package server

import (
	"fmt"
	"math/rand"
	"path/filepath"
	"strconv"

	"github.com/gin-gonic/gin"
)

type Method interface {
	GeneratePort(length int8)
	Run(PORT string)
}

type Server struct {
	Port    string
	PortLen int8
}

var Port string

func Init() Server {
	server := Server{PortLen: 4}
	server.GeneratePort()
	return server
}

func (server *Server) GeneratePort() string {
	fmt.Print("generating again")
	var port string = ""

	for i := int8(0); i < server.PortLen; i++ {
		randNumb := rand.Intn(int(server.PortLen))
		port = port + strconv.Itoa(randNumb)
	}

	server.Port = port
	Port = port
	return port
}

func (server *Server) Run(length int8) {
	gin.SetMode(gin.ReleaseMode)
	app := gin.Default()

	var port string = server.Port

	if port == "" {
		port = server.GeneratePort()
	}

	// trusted IP/Domain
	// trustedProxies := []string{
	// 	"127.0.0.1",
	// }
	//
	// // manage cors
	// if err := app.SetTrustedProxies(trustedProxies); err != nil {
	// 	log.Fatal(err)
	// }

	// Endpoint that manages files retrival
	app.GET("/", func(ctx *gin.Context) {
		path := ctx.Query("path")
		ext := ctx.Query("ext")
		fmt.Println(path)
		// size := ctx.Query("size")
		// Set headers
		ctx.Header("Content-Type", "audio/"+ext)
		ctx.Header("Content-Disposition", fmt.Sprintf("attachment; filename=%s", filepath.Base(path)))
		ctx.Header("Content-Length", fmt.Sprintf("%d", 5645))
		// Send Response
		ctx.File(path)
	})

	err := app.Run(":" + port)
	if err != nil {
		server.Run(length)
	}
}
