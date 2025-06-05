import Script from 'next/script'

export function RedirectTo({ path }: { path: string }) {
  return (
    <Script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
      dangerouslySetInnerHTML={{
        __html: `window.location.href = "${path}";`
      }}
    />
  )
}
