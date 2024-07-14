package handler

import (
	"net/http"

	"github.com/StudioPrimo/noteref/usecase"
	"github.com/gin-gonic/gin"
)

type data struct {
	Email string `json:"email"`
}

type IUserhandler interface {
	CreateUser(ctx *gin.Context)
}

type UserHandler struct {
	uc *usecase.IUserUsecase
}

func NewUserHandler(uc *usecase.IUserUsecase) IUserhandler {
	return &UserHandler{
		uc: uc,
	}
}

func (uh *UserHandler) CreateUser(ctx *gin.Context) {
	var d data

	if err := ctx.BindJSON(&d); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

}
