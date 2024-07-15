package cmd

import (
	"github.com/StudioPrimo/noteref/web/router"
)

func Exec() {
	r := router.NewRouter()
	r.InitHealthRouter()
	r.InitUserRouter()
	r.Serve()
}
