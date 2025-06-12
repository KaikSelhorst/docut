export const seoMetadata = {
  title: 'Docut - Customizable Link Shortener with SEO',
  description:
    'Shorten links with Docut! Add custom titles and descriptions for better previews on social platforms and integrate with our backend SDK. Start now!',
  keywords:
    'link shortener, custom links, SEO link previews, Docut, URL shortener, backend SDK, social media links',
  author: 'Docut',
  robots: 'index, follow',
  canonical: 'https://www.docut.xyz',
  openGraph: {
    title: 'Docut - Short Links with Custom SEO Previews',
    description:
      'Create short links with tailored titles and descriptions for enhanced social media previews. Integrate easily with Docut’s backend SDK.',
    type: 'website',
    url: 'https://www.docut.xyz',
    site_name: 'Docut',
    image: 'https://www.docut.xyz/assets/images/docut-logo.png'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Docut - Customizable Link Shortener with SEO',
    description:
      'Shorten URLs with custom SEO-friendly titles and descriptions for better sharing. Use Docut’s SDK for seamless backend integration.',
    image: 'https://www.docut.xyz/assets/images/docut-logo.png'
  },
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Docut',
    url: 'https://www.docut.xyz',
    description:
      'Docut offers a link shortening platform with customizable titles and descriptions for enhanced social media previews and backend SDK integration.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.docut.xyz/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  },
  favicon: '/favicon.svg'
} as const
