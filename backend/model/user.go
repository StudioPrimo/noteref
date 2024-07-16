package model

import (
	"errors"

	"github.com/uptrace/bun"
)

type User struct {
	Id            string `bun:"id,pk"`
	Name          string
	IsAdmin       bool
	Email         string `bun:"email"`
	bun.BaseModel `bun:"table:users,alias:u"`
}

func NewUser(id, name string, email string, isAdmin bool) (*User, error) {
	if id == "" {
		return nil, errors.New("id is required")
	}
	if name == "" {
		return nil, errors.New("name is required")
	}
	if email == "" {
		return nil, errors.New("email is required")
	}

	return &User{
		Id:      id,
		Email:   email,
		Name:    name,
		IsAdmin: isAdmin,
	}, nil
}
