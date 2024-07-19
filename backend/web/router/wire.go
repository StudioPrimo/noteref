//go:build wireinject
// +build wireinject

package router

import (
	"github.com/StudioPrimo/noteref/infrastructure/database"
	"github.com/StudioPrimo/noteref/infrastructure/persistance"
	"github.com/StudioPrimo/noteref/usecase"
	"github.com/StudioPrimo/noteref/web/http/handler"
	"github.com/google/wire"
)

var db = wire.NewSet(database.NewConn)

var persistanceSet = wire.NewSet(persistance.NewUserPersistance)

var usecaseSet = wire.NewSet(usecase.NewUserUsecase)

var handlerSet = wire.NewSet(handler.NewUserHandler)

type UserHandler struct {
	Handler handler.UserHandler
}

type FileHandler struct {
	Handler handler.FileHandler
}

func InitUserWire() (*UserHandler, error) {
	wire.Build(db, persistanceSet, usecaseSet, handlerSet, wire.Struct(new(UserHandler), "*"))
	return nil, nil
}

func InitFileWire() (*FileHandler, error) {
	wire.Build(db, persistanceSet, usecaseSet, handlerSet, wire.Struct(new(FileHandler), "*"))
	return nil, nil
}
