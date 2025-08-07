export function ok() {
  return Response.json({ ok: true })
}

export function json(data: any) {
  return Response.json(data)
}

export function badRequest(message = 'Bad request') {
  return Response.json({ message }, { status: 400 })
}

export function unauthorized(message = 'Unauthorized') {
  return Response.json({ message }, { status: 401 })
}

export function forbidden(message = 'Forbidden') {
  return Response.json({ message }, { status: 403 })
}

export function notFound(message = 'Not found') {
  return Response.json({ message }, { status: 404 })
}

export function serverError(message = 'Server error') {
  return Response.json({ message }, { status: 500 })
}

export function conflict(message = 'Conflict') {
  return Response.json({ message }, { status: 409 })
}
