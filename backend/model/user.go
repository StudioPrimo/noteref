package model

import (
	"errors"

	"github.com/uptrace/bun"
)

type User struct {
	Id            string `bun:",pk"`
	Name          string
	IsAdmin       bool
	Email         string `bun:"email"`
	bun.BaseModel `bun:"table:users,alias:u"`
}

func NewUser(id, name string, isAdmin bool) (*User, error) {
	if id == "" {
		return nil, errors.New("id is required")
	}
	if name == "" {
		return nil, errors.New("name is required")
	}

	return &User{
		Id:      id,
		Name:    name,
		IsAdmin: isAdmin,
	}, nil
}
