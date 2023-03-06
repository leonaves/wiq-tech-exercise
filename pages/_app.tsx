import React, {useEffect, useState} from 'react';
import type {AppProps} from 'next/app';
import partition from 'lodash.partition';

import {BasketProduct, Discount, Product} from './types';
import {Basket} from '../components/Basket';

import '../styles/globals.css';
import fetcher from "../utils/swr-fetcher";
import {useUpdateDiscounts} from "../hooks/useUpdateDiscounts";


interface IBasketState {
  products: Array<BasketProduct>;
  discounts?: Array<Discount>;
  addToCart: (p: Product) => () => void;
  toggleBasketModal: () => void;
}

export const BasketContext = React.createContext<IBasketState>({
  products: [],
  addToCart: () => () => {
  },
  toggleBasketModal: () => {
  },
});

function MyApp({Component, pageProps}: AppProps) {
  const [products, setProducts] = useState<Array<BasketProduct>>([]);
  const [discounts, setDiscounts] = useState<Array<Discount>>([]);
  const [basketVisible, setBasketVisible] = useState<boolean>(false);

  /**
   *  Update the discounts whenever the products change
   */
  useUpdateDiscounts(products, setDiscounts);

  /**
   * Defines the addToCart context
   */
  const addToCart =
    ({id, name, price}: Product) =>
      () => {
        const isExistingProduct = ({productId}: BasketProduct) => productId === id;
        const [[existingProduct], others] = partition(products, isExistingProduct);

        if (!existingProduct) {
          setProducts([...products, {productId: id, name, price, quantity: 1}]);
        } else {
          setProducts([...others, {...existingProduct, quantity: existingProduct.quantity + 1}]);
        }
      };

  const toggleBasketModal = () => setBasketVisible(!basketVisible);

  return (
    <BasketContext.Provider value={{products, discounts, addToCart, toggleBasketModal}}>
      <Component {...pageProps} />
      {basketVisible && <Basket/>}
    </BasketContext.Provider>
  );
}

export default MyApp;
