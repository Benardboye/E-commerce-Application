import React, { useContext } from 'react';
import { Layout } from '../component/Layout';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import { XCircleIcon } from '@heroicons/react/outline';
import Link from "next/link"

const CartScreen = () => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter()
  const{ cart: { cartItems } }= state;

  const removeItemHandler=(item)=>{

    // THE PRODUCT THAT IS GOING TO BE REMOVED IS TAGGED 
    // ITEM AND ITS PASSED AS A PAYLOAD
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  }
  return (
    <Layout title="Shopping Cart">
      <h1 className="mb-4 text-xl">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overFlow-x-auto md:col-span-3">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">Item</th>
                  <th className="px-5 text-right">Qunatity</th>
                  <th className="px-5 text-right">Price</th>
                  <th className="px-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug} className="border-b">
                    <td>
                      <Link
                        href={`/product/${item.slug}`}
                        className="flex items-center"
                      >
                        <img
                          src={item.image}
                          alt={item / name}
                          width={50}
                          height={50}
                        />
                        {/* space */}
                        &nbsp;
                        {item.name}
                      </Link>
                    </td>
                    <td className="px-5 text-right">{item.quantity}</td>
                    <td className="px-5 text-right">{item.price}</td>
                    <td className="px-5 text-center">
                      <button onClick={() => removeItemHandler(item)}>
                        <XCircleIcon className="h-5 w-5"></XCircleIcon>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5">
          <ul>
            <li>
              <div className="pb-3 text-xl">
                {/* SUMUP THE TOTAL PRODUCT PRICE  */}
                Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) : $
                {/* MULTIPLY THE PRICE AND QUANTITY */}
                {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
              </div>
            </li>
            <li>
                <button onClick={() => router.push("/shipping")} className='primary-button w-full'> 
                        Checkout
                </button>
            </li>
          </ul>
        </div>
        </div>
      )}
    </Layout>
  );
};

export default CartScreen;