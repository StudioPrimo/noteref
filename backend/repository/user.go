package repository

import (
	"context"

	"github.com/StudioPrimo/noteref/infrastructure/persistance"
	"github.com/StudioPrimo/noteref/model"
)

type IUserRepository interface {
	Create(ctx context.Context, user *model.User) (*model.User, error)
	Delete(ctx context.Context, id string) error
	GetByID(ctx context.Context, id string) (*model.User, error)
	GetByEmail(ctx context.Context, email string) (*model.User, error)
}

type UserRepository struct {
	persistance persistance.IUserPersistance
}

func NewUserRepository(persistance persistance.IUserPersistance) IUserRepository {
	return &UserRepository{
		persistance: persistance,
	}
}

func (u *UserRepository) Create(ctx context.Context, user *model.User) (*model.User, error) {
	return user, nil
}

func (u *UserRepository) Delete(ctx context.Context, id string) error {
	return nil
}

func (u *UserRepository) GetByID(ctx context.Context, id string) (*model.User, error) {
	return &model.User{}, nil
}

func (u *UserRepository) GetByEmail(ctx context.Context, email string) (*model.User, error) {
	user, err := u.persistance.FindByEmail(ctx, email)
	if err != nil {
		return nil, err
	}

	return user, nil
}
