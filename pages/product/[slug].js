// SLUG WILL BE A PARAMETER  THAT TAKES THE URLs
import React from 'react';
import { useRouter } from 'next/router';
import { Layout } from '../../component/Layout';
import data from '../../utils/data';
import Link from 'next/link';

export default function ProductScreen() {
  const { query } = useRouter();
  const { slug } = query;

  // FIND() HERE ACCEPTS A FUNCTION AS A PARAMETER TO GET A SEARCH CRITERIA
  const product = data.products.find((x) => x.slug === slug);
  if (!product) {
    return <div>Product Not Found</div>;
  }
  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href="/">back to products</Link>
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
        <div className="card p-5" >
            <div className='mb-2 flex justify-between'>
            <div>Price</div>
          <div>${product.price}</div>
            </div>
            <div className='mb-2 flex justify-between'>
            <div>Status</div>
            <div>{product.countInStock  > 0 ? "In stock" : "Unavailable"}</div>
            </div>
            <div className='primary-button    w-full'>Add to cart</div>
        </div>
      </div>
    </Layout>
  );
}
