package persistance

import (
	"context"

	"github.com/StudioPrimo/noteref/infrastructure/database"
	"github.com/StudioPrimo/noteref/model"
	"github.com/StudioPrimo/noteref/repository"
)

var _ IUserPersistance = &UserPersistance{}

type UserPersistance struct {
	repo *repository.IUserRepository
	db   *database.Conn
}

type IUserPersistance interface {
	CreateOne(ctx context.Context, user *model.User) (*model.User, error)
}

func NewUserPersistance(repo *repository.IUserRepository, db *database.Conn) IUserPersistance {
	return &UserPersistance{
		repo: repo,
		db:   db,
	}
}

func (u *UserPersistance) CreateOne(ctx context.Context, user *model.User) (*model.User, error) {
	if _, err := u.db.DB.NewInsert().Model(user).Exec(ctx); err != nil {
		return nil, err
	}

	return user, nil

}
