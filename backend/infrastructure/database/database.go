package database

import (
	"database/sql"
	"fmt"
)

type Conn struct {
	DB *sqlx.DB
}

// NewConnはMySQLを接続し、sql.DBオブジェクトのポインタをもつ構造体を返します
func NewConn() (*Conn, error) {
	dbDSN, err := config.DSN()
	if err != nil {
		return nil, err
	}

	db, err := sql.Open("mysql", dbDSN)
	if err != nil {
		return nil, fmt.Errorf("failed to open MySQL : %w", err)
	}

	return &Conn{DB: db}, nil
}
