import React, { useEffect, useState } from 'react'
import config from '../../config';
import './Plans.css'

import Card from '../../components/Card'
import { useStripe } from '@stripe/react-stripe-js';

function Plans() {
  const stripe = useStripe()
  const [data, setData] = useState({
    isLoading: true,
    products: [],
  })
  const [selected, setSelected] = useState(null);

  const getProducts = async() =>  {
    const uri = `${config.backendURL}/billing/products`;
    const resp = await fetch(uri,{ credentials : "include" });
    if (resp.status !== 200 ) {
      // error case, should show error
      return setData({ isLoading: false, products: [] });
    }
    const data = await resp.json();
    setData({ isLoading: false, products: data });
  };

  const checkout = async(data) =>  {
    if ( !data.price_id ) return null;
    const uri = `${config.backendURL}/billing/checkout?price_id=${data.price_id}`;
    const resp = await fetch(uri, {
      credentials: "include",
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    const { sessionId } = await resp.json();
    stripe.redirectToCheckout({ sessionId });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    checkout({ price_id: selected });
    return false;
  };

  const Product = ({ product }) => (
    <label className="productInfo">
        <div className="productName">
          <input
            name="plan"
            type="radio"
            checked={ selected === product.id }
            value={ product.id }
            onChange={ (e) => setSelected(e.target.value) }
          />
          { product.nickname }
        </div>
        <div className="productDesc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
        <div className="productPrice">{ product.price }</div>
    </label>)

  const Products = ({ products }) => {
    if (products.length === 0) {
      return <div>No products</div>
    }
    return (
    <form onSubmit={ handleSubmit } action="#">
      <div className="products">
        { products.map(i => <Product key={ i.id } product={ i } />) }
      </div>
      <button>Subscribe</button>
    </form>
  )}

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="billing-container content-container">
      <Card header="Subscription Example">
        { data.isLoading ?
          <p>Loading</p> :
          <Products products={ data.products }></Products>
        }
      </Card>
    </div>
  )
}

export default Plans
