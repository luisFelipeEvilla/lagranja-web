import '../styles/globals.css'
import RouteGuard from '../components/RouteGuard';
import Head from 'next/head'

function MyApp({ Component, pageProps, router }) {
  return <RouteGuard router={router}>
    <Head>
        <title>
          La Granja
        </title>
    </Head>
    <Component {...pageProps} />
  </RouteGuard>

}

export default MyApp
