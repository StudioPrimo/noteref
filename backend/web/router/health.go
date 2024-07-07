package router

import "github.com/StudioPrimo/noteref/web/http/handler"

func (r Router) InitHealthRouter() {
	r.Engine.GET("/health", handler.HealthHandler)
}
