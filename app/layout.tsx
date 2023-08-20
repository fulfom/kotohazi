import '../styles/globals.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { AppProps } from 'next/app'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ことはじ',
  description: '言オリ愛好家のためのサポートサイト',

  // <link rel="shortcut icon" href="/favicons/favicon.ico" />
  // <link rel="apple-touch-icon" href="/favicons/apple-touch-icon-180x180.png" sizes="180x180" />
  // <link rel="icon" type="image/png" href="/favicons/favicon-16x16.png" sizes="16x16" />
  // <link rel="icon" type="image/png" href="/favicons/favicon-32x32.png" sizes="32x32" />
  // <link rel="icon" type="image/png" href="/favicons/android-36x36.png" sizes="36x36" />
  // <link rel="icon" type="image/png" href="/favicons/android-48x48.png" sizes="48x48" />
  // <link rel="icon" type="image/png" href="/favicons/android-72x72.png" sizes="72x72" />
  // <link rel="icon" type="image/png" href="/favicons/android-96x96.png" sizes="96x96" />
  // <link rel="icon" type="image/png" href="/favicons/android-144x144.png" sizes="144x144" />
  // <link rel="icon" type="image/png" href="/favicons/android-192x192.png" sizes="192x192" />

  // <meta property="og:title" content="kotohazi" />
  // <meta property="og:description" content="言オリ愛好家のためのサポートサイト" />
  // <meta property="og:type" content="website" />
  // <meta property="og:url" content="https://kotohazi.netlify.app/" />
  // <meta property="og:image" content="https://kotohazi.netlify.app/images/logo.png" />
  // <meta property="og:site_name" content="ことはじ" />
  // <meta itemProp="name" content="kotohazi" />
  // <meta itemProp="description" content="言オリ愛好家のためのサポートサイト" />
  // <meta name="twitter:card" content="summary_large_image" />
  // <meta name="twitter:image" content="https://kotohazi.netlify.app/images/logo.png" />
  // <meta name="twitter:title" content="kotohazi" />
  // <meta name="twitter:description" content="言オリ愛好家のためのサポートサイト" />

}

// function MyApp({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }

// export default MyApp

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
