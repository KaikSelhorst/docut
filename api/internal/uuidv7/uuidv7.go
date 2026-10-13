// Package uuidv7 generates time-ordered UUID v7 values using the stdlib uuid package.
package uuidv7

import "uuid"

func New() (string, error) {
	return uuid.NewV7().String(), nil
}

func IsValid(s string) bool {
	_, err := uuid.Parse(s)
	return err == nil
}
