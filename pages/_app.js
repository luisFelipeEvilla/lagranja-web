import '../styles/globals.css'
import RouteGuard from '../components/RouteGuard';

function MyApp({ Component, pageProps, router }) {
  return <RouteGuard router={router}>
    <Component {...pageProps} />
  </RouteGuard>

}

export default MyApp
