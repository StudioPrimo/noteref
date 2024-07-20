package handler

import (
	"net/http"

	"github.com/StudioPrimo/noteref/model"
	"github.com/StudioPrimo/noteref/usecase"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type body struct {
	Email string `json:"email"`
	Name  string `json:"name"`
}

type UserHandler struct {
	uc usecase.IUserUsecase
}

func NewUserHandler(uc usecase.IUserUsecase) UserHandler {
	return UserHandler{
		uc: uc,
	}
}

func (uh *UserHandler) CreateUser(ctx *gin.Context) {
	var d body
	if err := ctx.BindJSON(&d); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}
	if d.Email == "" || d.Name == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": "email and Name is required",
		})
		return
	}
	user, err := uh.uc.GetByEmail(ctx, d.Email)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	if user != nil {
		ctx.JSON(http.StatusOK, gin.H{
			"message": "user already exists",
			"user_id": user.Id,
			"name":    user.Name,
			"email":   user.Email,
		})
		return
	}

	newUser, err := model.NewUser(uuid.New().String(), d.Name, d.Email, true)

	res, err := uh.uc.Create(ctx, newUser)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"Id":    res.Id,
		"Name":  res.Name,
		"Email": res.Email,
	})
}
