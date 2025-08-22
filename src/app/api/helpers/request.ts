import { z } from 'shared/lib/zod'
import { makeGeolocalization } from './geolocalization'
import { badRequest } from './response'
import { safeDecodeURIComponent } from './url'
import { makeUserDevice } from './user-device'

async function getRequestBody(req: Request) {
  try {
    return await req.clone().json()
  } catch {
    return undefined
  }
}

type ErrorHandler = () => Response
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

export async function getRequestInfo(request: Request) {
  const userDevice = makeUserDevice()
  const geo = makeGeolocalization()

  const userAgent = request.headers.get('user-agent') || ''
  const referer = request.headers.get('referer') || null

  const reqGeo = await geo.lookup(request.headers)
  const reqDevice = await userDevice.detect(userAgent)

  const city = safeDecodeURIComponent(reqGeo.city)
  const country = safeDecodeURIComponent(reqGeo.country)
  const ip = reqGeo.ip

  return {
    city,
    country,
    ip,
    referer,
    userAgent,
    os: reqDevice.os.name,
    device: reqDevice.device.type,
    browser: reqDevice.browser.name
  }
}
