package database

import (
	"database/sql"
	"fmt"

	"github.com/StudioPrimo/noteref/config"
	"github.com/uptrace/bun"
	"github.com/uptrace/bun/dialect/mysqldialect"
	"github.com/uptrace/bun/extra/bundebug"
)

type Conn struct {
	DB *bun.DB
}

func NewConn() (*Conn, error) {
	dbDSN, err := config.DSN()
	if err != nil {
		return nil, err
	}

	pool, err := sql.Open("mysql", dbDSN)
	if err != nil {
		return nil, fmt.Errorf("failed to open MySQL : %w", err)
	}
	defer pool.Close()

	db := bun.NewDB(pool, mysqldialect.New())

	db.AddQueryHook(bundebug.NewQueryHook(
		bundebug.WithVerbose(true),
	))

	return &Conn{DB: db}, nil
}
