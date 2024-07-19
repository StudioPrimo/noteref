package router

import (
	"github.com/StudioPrimo/noteref/infrastructure/database"
	"github.com/StudioPrimo/noteref/infrastructure/persistance"
	"github.com/StudioPrimo/noteref/usecase"
	"github.com/StudioPrimo/noteref/web/http/handler"
)

func (r Router) InitFileRouter(conn *database.Conn) {
	repo := persistance.NewFilePersistance(conn)

	uc := usecase.NewFileUsecase(repo)

	h := handler.NewFileHandler(uc)

	g := r.Engine.Group("/file")
	g.POST("/", h.Create)
}
