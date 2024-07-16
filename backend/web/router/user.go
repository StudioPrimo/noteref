package router

import "log"

func (r *Router) InitUserRouter() {
	log.Println("Init User Router")
	userHandler, err := InitUserWire()
	if err != nil {
		log.Println(err)
		panic(err)
	}

	r.Engine.POST("/register", userHandler.Handler.CreateUser)
}
