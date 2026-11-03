import { redirect } from "@sveltejs/kit";
import { API_URL } from "$app/env/private";
import { ACCESS_TOKEN_COOKIE, clearAuthCookies, getRefreshToken } from "#lib/server/auth.js";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ cookies, fetch }) => {
  const accessToken = cookies.get(ACCESS_TOKEN_COOKIE);
  const refreshToken = getRefreshToken(cookies);

  if (refreshToken) {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(accessToken ? { authorization: `Bearer ${accessToken}` } : {}),
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    }).catch(() => {});
  }

  clearAuthCookies(cookies);
  redirect(303, "/login");
};
