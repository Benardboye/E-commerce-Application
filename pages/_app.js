import '@/styles/globals.css';
import { SessionProvider, useSession } from 'next-auth/react';
import { StoreProvider } from '../utils/Store';
import {useRouter} from "next/router"
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
// import type { AppProps } from 'next/app'

export default function App({ Component, pageProps: {session, ...pageProps} }) {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <PayPalScriptProvider deferLoading={true}>
        {Component.auth? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
        </PayPalScriptProvider>
      </StoreProvider>
    </SessionProvider>
  );
}

function Auth({children}) {
  const router = useRouter()
  const {status, data: session } =useSession({
    required: true,
    onUnauthenticated(){
      router.push("/unauthorized?message= login required")
    }
  })
  if(status === "loading") {
    return <div>Loading...</div>
  }
  return children
}
