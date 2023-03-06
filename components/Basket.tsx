import React, { useContext } from 'react';
import styled from 'styled-components';
import { BasketContext } from '../pages/_app';

const Background = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 50%);
`;

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  padding: 1rem;
  background-color: white;
  border-radius: 10px;
`;

const BasketTitle = styled.h3`
  margin: 0.5em 0;
`;

const BasketProduct = styled.div`
  width: 100%;
  clear: both;

  padding-bottom: 2em;
  border-top: 1px solid grey;
  vertical-align: center;
  line-height: 2em;

  &:last-child {
    border-bottom: 1px solid grey;
  }
`;

const BasketProductDetails = styled.div`
  float: left;
`;

const BasketProductPrice = styled.div`
  float: right;
`;

export const Basket = () => {
  const { products, discounts, toggleBasketModal } = useContext(BasketContext);

  return (
    <Background onClick={toggleBasketModal}>
      <Container onClick={(e) => e.stopPropagation()}>
        <BasketTitle>Basket</BasketTitle>
        {products?.map(({ name, price, quantity }, key) => (
          <BasketProduct key={key}>
            <BasketProductDetails>
              {quantity} x {name}
            </BasketProductDetails>
            <BasketProductPrice>&pound;{(price / 100).toFixed(2)}</BasketProductPrice>
          </BasketProduct>
        ))}
        {discounts?.map(({ name, discount }, key) => (
          <BasketProduct key={key}>
            <BasketProductDetails>
              {name}
            </BasketProductDetails>
            <BasketProductPrice>-&pound;{(discount / 100).toFixed(2)}</BasketProductPrice>
          </BasketProduct>
        ))}
      </Container>
    </Background>
  );
};
