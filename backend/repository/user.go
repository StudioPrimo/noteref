package repository

import (
	"context"

	"github.com/StudioPrimo/noteref/model"
)

type IUserRepository interface {
	Create(ctx context.Context, user *model.User) (*model.User, error)
	Delete(ctx context.Context, id string) error
	GetByID(ctx context.Context, id string) (*model.User, error)
	GetByEmail(ctx context.Context, email string) (*model.User, error)
}
