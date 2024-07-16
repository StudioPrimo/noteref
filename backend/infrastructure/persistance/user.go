package persistance

import (
	"context"

	"github.com/StudioPrimo/noteref/infrastructure/database"
	"github.com/StudioPrimo/noteref/model"
	"github.com/StudioPrimo/noteref/repository"
)

var _ repository.IUserRepository = &UserPersistance{}

type UserPersistance struct {
	Conn *database.Conn
}

func NewUserPersistance(Conn *database.Conn) repository.IUserRepository {
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

func (u *UserPersistance) GetByEmail(ctx context.Context, email string) (*model.User, error) {
	var user *model.User
	if err := u.Conn.DB.NewSelect().Model(user).Where("email = ?", email).Scan(ctx); err != nil {
		return nil, err
	}
	return user, nil
}

func (u *UserPersistance) Delete(ctx context.Context, id string) error {
	return nil
}
func (u *UserPersistance) GetByID(ctx context.Context, id string) (*model.User, error) {
	return nil, nil
}
