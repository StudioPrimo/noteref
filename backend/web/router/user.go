package router

import "github.com/StudioPrimo/noteref/web/http/handler"

func (r Router) InitCreateUserByEmailHandler() {
	r.Engine.POST("/register", handler.CreateUser)
}
