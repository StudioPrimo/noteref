package cmd

import (
	"github.com/StudioPrimo/noteref/infrastructure/database"
	"github.com/StudioPrimo/noteref/web/router"
)

func Exec() {
	db, err := database.NewConn()
	if err != nil {
		panic(err)
	}

	r := router.NewRouter()
	r.InitHealthRouter()
	r.InitUserRouter()
	r.InitFileRouter(db)
	r.Serve()
}
