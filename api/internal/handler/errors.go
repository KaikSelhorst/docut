package handler

import (
	"errors"
	"net/http"

	"github.com/KaikSelhorst/shortener/internal/httputil"
	"github.com/KaikSelhorst/shortener/internal/repository"
)

func writeError(w http.ResponseWriter, status int, msg string) {
	httputil.WriteError(w, status, msg)
}

func writeJSON(w http.ResponseWriter, status int, v any) {
	httputil.WriteJSON(w, status, v)
}

func repoError(w http.ResponseWriter, err error, notFoundMsg string) {
	if errors.Is(err, repository.ErrNotFound) {
		writeError(w, http.StatusNotFound, notFoundMsg)
	} else {
		writeError(w, http.StatusInternalServerError, "internal server error")
	}
}
