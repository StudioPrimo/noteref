package router

func (r Router) InitCreateUserByEmailHandler() {
	userHandler, err := InitUserWire()
	if err != nil {
		panic(err)
	}

	r.Engine.POST("/register", userHandler.Handler.CreateUser)
}
