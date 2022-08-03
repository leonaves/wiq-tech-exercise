import React, { useState } from 'react';
import type { AppProps } from 'next/app';
import partition from 'lodash.partition';

import { BasketProduct, Product } from './types';
import { Basket } from '../components/Basket';

import '../styles/globals.css';

interface IBasketState {
  basket?: Array<BasketProduct>;
  addToCart: (p: Product) => () => void;
  toggleBasketModal: () => void;
}

export const BasketContext = React.createContext<IBasketState>({
  addToCart: () => () => {},
  toggleBasketModal: () => {},
});

function MyApp({ Component, pageProps }: AppProps) {
  const [basket, setBasket] = useState<Array<BasketProduct>>([]);
  const [basketVisible, setBasketVisible] = useState<boolean>(false);

  const addToCart =
    ({ id, name, price }: Product) =>
    () => {
      const isProduct = ({ productId }: BasketProduct) => productId === id;
      const [[product], others] = partition(basket, isProduct);

      if (!product) {
        setBasket([...basket, { productId: id, name, price, quantity: 1 }]);
      } else {
        setBasket([...others, { ...product, quantity: product.quantity + 1 }]);
      }
    };

  const toggleBasketModal = () => setBasketVisible(!basketVisible);

  return (
    <BasketContext.Provider value={{ basket, addToCart, toggleBasketModal }}>
      <Component {...pageProps} />
      {basketVisible && <Basket />}
    </BasketContext.Provider>
  );
}

export default MyApp;
