import { success } from '@/actions/response'
import { createGetPublicLinkService } from '@api/services/factories/link'
import { isbot } from 'isbot'

interface GetPublicLinkData {
  url: string
  seo: {
    title: string | null
    description: string | null
  }
}

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ hash: string }> }
) => {
  const is = isbot(req.headers.get('User-Agent'))

  const getPublicLinkService = createGetPublicLinkService()

  const { hash } = await params

  const res = await getPublicLinkService.execute(req, { id: hash })

  if (!res.ok) return new Response(null, { status: res.status })

  const { data: linkData } = await success<GetPublicLinkData>(res)

  if (is) {
    const htmlContent = generateHTMLTemplate(
      linkData.seo.title || '',
      linkData.seo.description || '',
      linkData.url
    )
    const headers = new Headers()
    headers.set('Content-Type', 'text/html')

    return new Response(htmlContent, { headers })
  }

  return Response.redirect(linkData.url, 308)
}

function generateHTMLTemplate(title: string, description: string, url: string) {
  return `
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>${title}</title>
        <!-- Twitter Card metadata -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="${title}">
        <meta name="twitter:description" content="${description}">
        <!-- <meta name="twitter:image" content="https://exemplo.com/imagem.jpg"> -->
        <!-- <meta name="twitter:site" content="@SeuTwitter"> -->
        <!-- Open Graph metadata (fallback para Twitter e outras plataformas) -->
        <meta property="og:title" content="${title}">
        <meta property="og:description" content="${description}">
        <!-- <meta property="og:image" content="https://exemplo.com/imagem.jpg"> -->
        <meta property="og:url" content="${url}">
        <meta property="og:type" content="website">

        <meta name="robots" content="noindex, nofollow">
      </head>
      <body></body>
      </html>
  `
}
