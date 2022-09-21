import '../styles/globals.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
