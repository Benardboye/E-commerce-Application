import '@/styles/globals.css'
import { StoreProvider } from '../utils/Store'
// import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />  
    </StoreProvider>
  )
}
