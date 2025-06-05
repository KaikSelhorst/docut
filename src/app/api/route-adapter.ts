type RouteParams<T> = {
  params: Promise<T>
}

type Route<T> = (req: Request, params: T) => Promise<Response>

export function routeAdapter<T>(route: Route<T>) {
  return async (req: Request, ctx: RouteParams<T>) => {
    const params = await ctx.params
    return await route(req, params)
  }
}
