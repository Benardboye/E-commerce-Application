// SLUG WILL BE A PARAMETER  THAT TAKES THE URLs USING USEROUTER
import axios from 'axios';
import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { Layout } from '../../component/Layout';
import db from '../../utils/db';
import Product from '../../models/Product';
import Link from 'next/link';
import { Store } from '../../utils/Store';

/**************************** DISPLAY PRODUCT DETAILS  **********************************/
export default function ProductScreen({ product }) {
  const { state, dispatch } = useContext(Store);
  //FOR NAVIGATION
  const router = useRouter();

  if (!product) {
    return <Layout title="Product Not Found">Product Not Found</Layout>;
  }

  const addToCartHandler = async() => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      alert('Sorry, Product is out of stock');
      return;
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    // NAVIGATE USER TO CART AFTER CLICKING ADD TO CART
    router.push('/cart');
  };

  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href="/">Back</Link>
      </div>
      <div className="grid md grid-cols-4  md:gap-3">
        <div className="md: col-span-2">
          <img
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          ></img>
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg">{product.name}</h1>
            </li>
            <li> Category: {product.category}</li>
            <li>Brand: {product.brand}</li>
            <li>
              {product.rating} of {product.numReview} reviews
            </li>
            <li>Description: {product.description}</li>
          </ul>
        </div>
        <div className="card p-5">
          <div className="mb-2 flex justify-between">
            <div>Price</div>
            <div>${product.price}</div>
          </div>
          <div className="mb-2 flex justify-between">
            <div>Status</div>
            <div>{product.countInStock > 0 ? 'In stock' : 'Unavailable'}</div>
          </div>
          <div className="primary-button    w-full" onClick={addToCartHandler}>
            Add to cart
          </div>
        </div>
      </div>
    </Layout>
  );
}

  //*************************   CONNECTION TO DATABASE ************************* */ 

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;
  await db.connect();
  // LEAN TO CONVERT TO JAVASCRIPT OBJECT
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
