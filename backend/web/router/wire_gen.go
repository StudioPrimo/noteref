// Code generated by Wire. DO NOT EDIT.

//go:generate go run -mod=mod github.com/google/wire/cmd/wire
//go:build !wireinject
// +build !wireinject

package router

import (
	"github.com/StudioPrimo/noteref/infrastructure/database"
	"github.com/StudioPrimo/noteref/infrastructure/persistance"
	"github.com/StudioPrimo/noteref/repository"
	"github.com/StudioPrimo/noteref/usecase"
	"github.com/StudioPrimo/noteref/web/http/handler"
	"github.com/google/wire"
)

// Injectors from wire.go:

func InitUserWire() (*UserHandler, error) {
	conn, err := database.NewConn()
	if err != nil {
		return nil, err
	}
	iUserPersistance := persistance.NewUserPersistance(conn)
	iUserRepository := repository.NewUserRepository(iUserPersistance)
	iUserUsecase := usecase.NewUserUsecase(iUserRepository)
	userHandler := handler.NewUserHandler(iUserUsecase)
	routerUserHandler := &UserHandler{
		Handler: userHandler,
	}
	return routerUserHandler, nil
}

// wire.go:

var db = wire.NewSet(database.NewConn)

var persistanceSet = wire.NewSet(persistance.NewUserPersistance)

var repositorySet = wire.NewSet(repository.NewUserRepository)

var usecaseSet = wire.NewSet(usecase.NewUserUsecase)

var handlerSet = wire.NewSet(handler.NewUserHandler)

type UserHandler struct {
	Handler handler.UserHandler
}
