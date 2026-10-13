package dto

import (
	"errors"
	"regexp"
	"time"
)

var validName = regexp.MustCompile(`^[\p{L}0-9 _-]+$`)

type ProjectRequest struct {
	Name string `json:"name"`
}

func (r *ProjectRequest) Validate() error {
	if r.Name == "" {
		return errors.New("name is required")
	}
	if len(r.Name) > 100 {
		return errors.New("name must be at most 100 characters")
	}
	if !validName.MatchString(r.Name) {
		return errors.New("name can only contain letters, digits, spaces, hyphens and underscores")
	}
	return nil
}

type ProjectResponse struct {
	ID        int64     `json:"id"`
	Name      string    `json:"name"`
	Slug      string    `json:"slug"`
	CreatedAt time.Time `json:"created_at"`
}
