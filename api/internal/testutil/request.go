package testutil

import (
	"bytes"
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"

	"github.com/KaikSelhorst/shortener/internal/middleware"
	"github.com/KaikSelhorst/shortener/internal/model"
)

func NewRequest(method, target string, body any) *http.Request {
	var b bytes.Buffer
	if body != nil {
		_ = json.NewEncoder(&b).Encode(body)
	}
	r := httptest.NewRequest(method, target, &b)
	r.Header.Set("Content-Type", "application/json")
	return r
}

func WithUserID(r *http.Request, userID int64) *http.Request {
	ctx := context.WithValue(r.Context(), middleware.UserIDKey, userID)
	return r.WithContext(ctx)
}

func WithAPIKey(r *http.Request, key *model.APIKey) *http.Request {
	ctx := context.WithValue(r.Context(), middleware.UserIDKey, key.UserID)
	ctx = context.WithValue(ctx, middleware.APIKeyKey, key)
	return r.WithContext(ctx)
}

func DecodeJSON(w *httptest.ResponseRecorder, dst any) error {
	return json.NewDecoder(w.Body).Decode(dst)
}
