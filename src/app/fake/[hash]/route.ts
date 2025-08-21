import { createGetPublicLinkService } from '@api/services/factories/link'
import { isbot } from 'isbot'

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ hash: string }> }
) => {
  console.log(params)
  const is = isbot(req.headers.get('User-Agent'))

  if (is) {
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Exemplo</title>
    </head>
    <body>
      <h1>Olá, mundo!</h1>
      <p>Este é um HTML retornado pela API.</p>
    </body>
    </html>
  `
    const headers = new Headers()
    headers.set('Content-Type', 'text/html')

    return new Response(htmlContent, { headers })
  }

  const { hash } = await params

  const getPublic = createGetPublicLinkService()

  const link = await getPublic.execute(req, { id: hash })

  if (link.status === 200) {
    const json = await link.json()
    return Response.redirect(json.url, 301)
  }

  const url = new URL(req.url)

  return Response.redirect(url.origin)
}
