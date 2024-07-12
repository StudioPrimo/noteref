package usecase_test

import (
	"fmt"
	"testing"

	"github.com/StudioPrimo/noteref/model"
	"github.com/StudioPrimo/noteref/repository/mock_repository"
	"github.com/StudioPrimo/noteref/usecase"
	"go.uber.org/mock/gomock"
)

func NewMockUserRepo(ctrl *gomock.Controller) *mock_repository.MockIUserRepository {
	return mock_repository.NewMockIUserRepository(ctrl)
}

func TestCreate(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	tests := make([]*model.User, 3)

	for i := 0; i < 3; i++ {
		tests[i] = &model.User{
			Id:      fmt.Sprint(i),
			Name:    fmt.Sprintf("Name %d", i),
			IsAdmin: true,
		}
	}

	repo := NewMockUserRepo(ctrl)
	for _, test := range tests {
		repo.EXPECT().Create(gomock.Any(), gomock.Any()).Return(test, nil)
		uu := usecase.NewUserUsecase(repo)
		user, err := uu.Create(nil, test)
		if err != nil {
			t.Errorf("Error: %v", err)
		}
		if user == nil {
			t.Errorf("User is nil")
		}
		if user.Id != test.Id {
			t.Errorf("User id is not the same")
		}
	}
}
