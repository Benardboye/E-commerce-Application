import Head from 'next/head';
import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { ToastContainer } from 'react-toastify';
import { Store } from '../utils/Store';
import { useSession } from 'next-auth/react';
import "react-toastify/dist/ReactToastify.css"

export const Layout = ({ title, children }) => {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);
  return (
    <>
      <Head>
        <title>{title ? title + ' - Boye Gadget' : 'Boye Gadget'}</title>
        <meta name="description" content="Ecommerce Website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="top-right" limit={1} />

      <div className="flex  min-h-screen  flex-col  justify-between">
        <header>
          <nav className="flex  h-12 items-center px-4  justify-between shadow-md">
            <Link href="/" className="text-lg font-bold">
              Boye Gadget
            </Link>
            <div>
              <Link href="/cart" className="p-2">
                Cart
                {cartItemsCount > 0 && (
                  <span className="ml-1 rounded-full  bg-red-600   px-2 py-1 text-xs font-bold  text-white">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              {status === 'loading' ? (
                'Loading'
              ) : session?.user ? (
                session.user.name
              ) : (
                <Link href="/login" className="p-2">
                  Login
                </Link>
              )}
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex  h-10 justify-center  items-center shadow-inner">
          React Practical Challenge
        </footer>
      </div>
    </>
  );
};
