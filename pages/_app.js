import '../styles/globals.css'
import RouteGuard from '../components/RouteGuard';
import Head from 'next/head'
import { Flowbite } from 'flowbite-react'

function MyApp({ Component, pageProps, router }) {
  return <RouteGuard router={router}>
    <Flowbite>
      <Head>
        <title>
          La Granja
        </title>
      </Head>
      <Component {...pageProps} />
    </Flowbite>
  </RouteGuard>

}

export default MyApp
