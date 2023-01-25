import axios from 'axios';
import { Inter } from '@next/font/google';
import { Layout } from '../component/Layout';
import db from "../utils/db"
import Product from "../models/Product"
import ProductItem from '../component/ProductItem';
import {useContext} from "react"
import { Store } from '../utils/Store';
import { toast } from 'react-toastify';

export default function Home({products}) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error('Sorry. Product is out of stock');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });

    toast.success('Product added to the cart');
  };

  return (
    <Layout title="Home page">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {/* THE DISPLAY ITEM WOULD DISPLAY 3 GRID ON MEDIUM SCREEN AND 4 ON LARGE SCREEN */}
        {products.map((product) => (
          // PROPS IS PASSED TO THE PRODUCTITEM COMPONENT
          <ProductItem product={product} key={product.slug} 
          addToCartHandler={addToCartHandler}
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  const featuredProducts = await Product.find({ isFeatured: true }).lean();
  return {
    props: {
      featuredProducts: featuredProducts.map(db.convertDocToObj),
      products: products.map(db.convertDocToObj),
    },
  };
}
