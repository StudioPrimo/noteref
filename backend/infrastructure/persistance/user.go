package persistance

import (
	"context"

	"github.com/StudioPrimo/noteref/infrastructure/database"
	"github.com/StudioPrimo/noteref/model"
)

var _ IUserPersistance = &UserPersistance{}

type UserPersistance struct {
	Conn *database.Conn
}

type IUserPersistance interface {
	Create(ctx context.Context, user *model.User) (*model.User, error)
	FindByEmail(ctx context.Context, email string) (*model.User, error)
}

func NewUserPersistance(Conn *database.Conn) IUserPersistance {
	return &UserPersistance{
		Conn: Conn,
	}
}

func (u *UserPersistance) Create(ctx context.Context, user *model.User) (*model.User, error) {
	if _, err := u.Conn.DB.NewInsert().Model(user).Exec(ctx); err != nil {
		return nil, err
	}

	return user, nil

}

func (u *UserPersistance) FindByEmail(ctx context.Context, email string) (*model.User, error) {
	var user *model.User
	if err := u.Conn.DB.NewSelect().Model(&user).Where("email = ?", email).Scan(ctx); err != nil {
		return nil, err
	}
	return user, nil
}
