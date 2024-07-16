package model

import "errors"

type File struct {
	Id     string `bun:",pk"`
	Name   string
	UserID string
}

func NewFile(id, name, userID string) (*File, error) {
	if id == "" {
		return nil, errors.New("id is required")
	}
	if name == "" {
		return nil, errors.New("name is required")
	}
	if userID == "" {
		return nil, errors.New("userID is required")
	}

	return &File{
		Id:     id,
		Name:   name,
		UserID: userID,
	}, nil
}