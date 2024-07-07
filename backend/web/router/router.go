package router

import (
	"fmt"
	"time"

	"github.com/StudioPrimo/noteref/config"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type Router struct {
	Engine *gin.Engine
}

func NewRouter() *Router {
	e := gin.Default()
	r := &Router{
		Engine: e,
	}

	r.setMiddleware()

	return r
}

func (r *Router) Serve() {
	err := r.Engine.Run(fmt.Sprintf(":%s", config.Port()))
	if err != nil {
		panic(err)
	}
}

func (r *Router) setMiddleware() {
	r.cors()
}

func (r *Router) cors() {
	r.Engine.Use(cors.New(cors.Config{
		AllowOrigins: []string{
			"http://localhost:3000",
		},
		AllowMethods: []string{
			"POST",
			"GET",
			"DELETE",
			"OPTIONS",
			"PUT",
		},
		AllowHeaders: []string{
			"Access-Control-Allow-Credentials",
			"Access-Control-Allow-Headers",
			"Access-Control-Allow-Origin",
			"Content-Type",
			"Content-Length",
			"Accept-Encoding",
			"Authorization",
		},
		AllowCredentials: true,
		MaxAge:           24 * time.Hour,
	}))
}
