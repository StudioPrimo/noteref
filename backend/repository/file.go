package repository

import (
	"context"

	"github.com/StudioPrimo/noteref/model"
)

type IFileRepository interface {
	Create(ctx context.Context, file *model.File) (*model.File, error)
	CreateMany(ctx context.Context, files []*model.File) ([]*model.File, error)
	Delete(ctx context.Context, id string) error
	GetByID(ctx context.Context, id string) (*model.File, error)
}
