package usecase

import (
	"context"
	"database/sql"
	"fmt"
	"log"

	"github.com/StudioPrimo/noteref/model"
	"github.com/StudioPrimo/noteref/repository"
)

var _ IUserUsecase = &UserUsecase{}

type UserUsecase struct {
	repo repository.IUserRepository
}

type IUserUsecase interface {
	Create(ctx context.Context, user *model.User) (*model.User, error)
	Delete(ctx context.Context, id string) error
	GetByID(ctx context.Context, id string) (*model.User, error)
	GetByEmail(ctx context.Context, email string) (*model.User, error)
}

func NewUserUsecase(repo repository.IUserRepository) IUserUsecase {
	return &UserUsecase{
		repo: repo,
	}
}

func (uu *UserUsecase) Create(ctx context.Context, user *model.User) (*model.User, error) {
	log.Println(user)
	resuser, err := uu.repo.Create(ctx, user)
	return resuser, err
}

func (uu *UserUsecase) Delete(ctx context.Context, id string) error {
	if id == "" {
		return fmt.Errorf("id empty")
	}
	_, err := uu.GetByID(ctx, id)
	if err == sql.ErrNoRows {
		return fmt.Errorf("The user with this id does not exist")
	}
	err = uu.repo.Delete(ctx, id)
	return err
}

func (uu *UserUsecase) GetByID(ctx context.Context, id string) (*model.User, error) {
	if id == "" {
		return nil, fmt.Errorf("id empty")
	}
	resuser, err := uu.repo.GetByID(ctx, id)
	return resuser, err
}

func (uu *UserUsecase) GetByEmail(ctx context.Context, email string) (*model.User, error) {
	if email == "" {
		return nil, fmt.Errorf("email empty")
	}
	user, err := uu.repo.GetByEmail(ctx, email)
	return user, err
}
