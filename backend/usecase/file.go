package usecase

import (
	"context"
	"database/sql"
	"errors"

	"github.com/StudioPrimo/noteref/model"
	"github.com/StudioPrimo/noteref/repository"
)

var _ IFileUsecase = &FileUsecase{}

type FileUsecase struct {
	repo repository.IFileRepository
}

type IFileUsecase interface {
	Create(ctx context.Context, file *model.File) (*model.File, error)
	Delete(ctx context.Context, id string) error
	GetByID(ctx context.Context, id string) (*model.File, error)
	CreateMany(ctx context.Context, files []*model.File) ([]*model.File, error)
}

func NewFileUsecase(repo repository.IFileRepository) IFileUsecase {
	return &FileUsecase{
		repo: repo,
	}
}

func (fu *FileUsecase) Create(ctx context.Context, file *model.File) (*model.File, error) {
	file, err := fu.GetByID(ctx, file.ID)
	if errors.Is(err, sql.ErrNoRows) {
		return nil, errors.New("The file with this id already exists")
	} else if err == nil {
		return nil, err
	}

	resfile, err := fu.repo.Create(ctx, file)
	return resfile, err
}

func (fu *FileUsecase) Delete(ctx context.Context, id string) error {
	err := fu.repo.Delete(ctx, id)
	return err
}

func (fu *FileUsecase) GetByID(ctx context.Context, id string) (*model.File, error) {
	resfile, err := fu.repo.GetByID(ctx, id)
	return resfile, err
}

func (fu *FileUsecase) CreateMany(ctx context.Context, files []*model.File) ([]*model.File, error) {
	resfiles, err := fu.repo.CreateMany(ctx, files)
	return resfiles, err
}
