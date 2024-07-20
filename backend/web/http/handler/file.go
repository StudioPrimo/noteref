package handler

import (
	"net/http"

	"github.com/StudioPrimo/noteref/model"
	"github.com/StudioPrimo/noteref/usecase"
	"github.com/gin-gonic/gin"
)

type filebody struct {
	ID     string `json:"id"`
	Name   string `json:"name"`
	UserID string `json:"user_id"`
}

type FileHandler struct {
	uc usecase.IFileUsecase
}

func NewFileHandler(uc usecase.IFileUsecase) *FileHandler {
	return &FileHandler{
		uc: uc,
	}
}

func (fh *FileHandler) Create(ctx *gin.Context) {
	var b filebody
	if err := ctx.BindJSON(&b); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}
	file, err := model.NewFile(b.ID, b.Name, b.UserID)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	resfile, err := fh.uc.Create(ctx, file)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	jsonresfile := bindFileJSON(resfile)

	ctx.JSON(http.StatusOK, gin.H{
		"file": jsonresfile,
	})
}

func bindFileJSON(file *model.File) filebody {
	return filebody{
		ID:     file.ID,
		Name:   file.Name,
		UserID: file.UserID,
	}
}

func (fh *FileHandler) CreateMany(ctx *gin.Context) {
	var files []*model.File
	if err := ctx.BindJSON(&files); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	resfiles, err := fh.uc.CreateMany(ctx, files)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	var jsonresfiles []filebody
	for _, file := range resfiles {
		jsonresfiles = append(jsonresfiles, bindFileJSON(file))
	}

	ctx.JSON(http.StatusOK, gin.H{
		"files": jsonresfiles,
	})
}
