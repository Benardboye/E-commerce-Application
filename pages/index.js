import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import {Layout} from '../component/Layout';
import data from "../utils/data"
import  ProductItem from "../component/ProductItem"
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return <Layout title="Home page">
    
    <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4'>
      {/* THE DISPLAY ITEM WOULD DISPLAY 3 GRID ON MEDIUM SCREEN AND 4 ON LARGE SCREEN */}
  {data.products.map((product) => (
    
    // PROPS IS PASSED TO THE PRODUCTITEM COMPONENT
    <ProductItem product={product} key={product.slug} />
  ))}
    </div>
  </Layout>;
}
