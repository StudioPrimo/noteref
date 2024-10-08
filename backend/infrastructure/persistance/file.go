package persistance

import (
	"context"

	"github.com/StudioPrimo/noteref/infrastructure/database"
	"github.com/StudioPrimo/noteref/model"
	"github.com/StudioPrimo/noteref/repository"
)

var _ repository.IFileRepository = &FilePersistance{}

type FilePersistance struct {
	Conn *database.Conn
}

func NewFilePersistance(Conn *database.Conn) repository.IFileRepository {
	return &FilePersistance{
		Conn: Conn,
	}
}

func (f *FilePersistance) Create(ctx context.Context, file *model.File) (*model.File, error) {
	if _, err := f.Conn.DB.NewInsert().Model(file).Exec(ctx); err != nil {
		return nil, err
	}
	return file, nil
}

func (f *FilePersistance) Delete(ctx context.Context, id string) error {
	return nil
}

func (f *FilePersistance) GetByID(ctx context.Context, id string) (*model.File, error) {
	file := &model.File{}
	err := f.Conn.DB.NewSelect().Model(&model.File{}).Where("id = ?", id).Scan(ctx)
	if err != nil {
		return nil, err
	}
	return file, nil

}

func (f *FilePersistance) CreateMany(ctx context.Context, files []*model.File) ([]*model.File, error) {
	if _, err := f.Conn.DB.NewInsert().Model(&files).Exec(ctx); err != nil {
		return nil, err
	}
	return files, nil
}
