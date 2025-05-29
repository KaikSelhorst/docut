type RouteParams<T> = {
  params: Promise<T>
}

// biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
type Route<T> = (req: Request, params: T) => Promise<Response | void>

export function routeAdapter<T>(route: Route<T>) {
  return async (req: Request, ctx: RouteParams<T>) => {
    const params = await ctx.params
    return await route(req, params)
  }
}
