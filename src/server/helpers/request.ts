import { z } from 'shared/lib/zod'
import { badRequest } from './response'

async function getRequestBody(req: Request) {
  try {
    return await req.clone().json()
  } catch {
    return undefined
  }
}

type ErrorHandler = () => void
type zodSchema = z.ZodType | undefined
type Schema<T extends zodSchema> = T extends z.ZodType ? z.infer<T> : object

interface ParsedRequest<T extends zodSchema> {
  ctx: Schema<T>
  err?: ErrorHandler
}

export async function parseRequest<T extends zodSchema = undefined>(
  req: Request,
  schema?: T
): Promise<ParsedRequest<T>> {
  let err: ErrorHandler | undefined

  function onError(e: ErrorHandler) {
    err = e
  }

  const ctx = await getBodyAndQueryFromRequest(req, onError, schema)
  return { ctx, err }
}

async function getBodyAndQueryFromRequest<T extends zodSchema>(
  req: Request,
  onError: (e: ErrorHandler) => void,
  schema?: T
): Promise<Schema<T>> {
  const isGet = req.method === 'GET'
  const url = new URL(req.url)

  const body = isGet ? {} : await getRequestBody(req)
  const query = Object.fromEntries(url.searchParams)
  const merged = { ...body, ...query }

  if (!schema) {
    return merged as Schema<T>
  }

  const { data, error } = schema.safeParse(merged)

  if (error) {
    onError(() => badRequest(z.prettifyError(error)))
  }

  return data as Schema<T>
}
